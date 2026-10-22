
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { CreateUserApiResponse, CreateUserPayload, UserRecord, UserRole, UsersApiResponse, UserStatsData } from "@/app/src/components/dashboard/admin/users/user-types";
import UsersHeader from "@/app/src/components/dashboard/admin/users/users-header";
import UsersStats from "@/app/src/components/dashboard/admin/users/users-stats";
import UsersFilters from "@/app/src/components/dashboard/admin/users/users-filters";
import UsersList from "@/app/src/components/dashboard/admin/users/users-list";
import CreateUserModal from "@/app/src/components/dashboard/admin/users/create-user-modal";



const emptyStats: UserStatsData = {
  total: 0,
  students: 0,
  mentors: 0,
  admins: 0,
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState<UserRole | "ALL">("ALL");

  const [modalOpen, setModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get<UsersApiResponse>("/admin/users");

      if (!response.data.success || !Array.isArray(response.data.data)) {
        throw new Error(response.data.message || "Invalid users response.");
      }

      setUsers(response.data.data);
    } catch (err: unknown) {
      const message =
        (
          err as {
            response?: { data?: { message?: string } };
            message?: string;
          }
        )?.response?.data?.message ||
        (err as { message?: string })?.message ||
        "Could not load users. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  const stats = useMemo<UserStatsData>(
    () => ({
      total: users.length,
      students: users.filter((user) => user.role === "STUDENT").length,
      mentors: users.filter((user) => user.role === "MENTOR").length,
      admins: users.filter((user) => user.role === "ADMIN").length,
    }),
    [users],
  );

  const filteredUsers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !normalizedSearch ||
        user.name.toLowerCase().includes(normalizedSearch) ||
        user.email.toLowerCase().includes(normalizedSearch);

      const matchesRole = role === "ALL" || user.role === role;

      return matchesSearch && matchesRole;
    });
  }, [users, search, role]);

  const handleCreateUser = async (payload: CreateUserPayload) => {
    setCreating(true);
    setCreateError(null);

    try {
      const response = await api.post<CreateUserApiResponse>(
        "/admin/users",
        payload,
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Could not create user.");
      }

      toast.success(response.data.message || "User created successfully.");
      setModalOpen(false);
      await fetchUsers();
    } catch (err: unknown) {
      const message =
        (
          err as {
            response?: { data?: { message?: string } };
            message?: string;
          }
        )?.response?.data?.message ||
        (err as { message?: string })?.message ||
        "Could not create user. Please try again.";

      setCreateError(message);
      throw err;
    } finally {
      setCreating(false);
    }
  };

  return (
    <main className="min-w-0 space-y-6 pb-8">
      <UsersHeader
        onCreateUser={() => {
          setCreateError(null);
          setModalOpen(true);
        }}
        onRefresh={fetchUsers}
        loading={loading}
      />

      <UsersStats stats={stats} loading={loading} />

      <UsersFilters
        search={search}
        onSearchChange={setSearch}
        role={role}
        onRoleChange={setRole}
        onClear={() => {
          setSearch("");
          setRole("ALL");
        }}
      />

      <UsersList
        users={filteredUsers}
        loading={loading}
        error={error}
      />

      <CreateUserModal
        open={modalOpen}
        loading={creating}
        error={createError}
        onClose={() => {
          if (!creating) {
            setModalOpen(false);
            setCreateError(null);
          }
        }}
        onSubmit={handleCreateUser}
      />
    </main>
  );
}
