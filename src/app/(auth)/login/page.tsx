"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/store/api/authApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Routes } from "@/lib/routes";
import { MOCK_USERS, Role } from "@/lib/mockData";
import { toast } from "sonner";

/** Demo accounts for easy login (email + password only, for UI) */
const DEMO_ACCOUNTS = MOCK_USERS.map((u) => ({
  email: u.email,
  password: u.password,
  label: `${u.name} (${u.role})`,
}));

export default function LoginPage() {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error("Please enter email and password.");
      return;
    }
    try {
      const result = await login({ email: email.trim(), password }).unwrap();
      console.log({ result });
      toast.success("Welcome back!");
      const role = result.user.role as Role;
      if (role === "customer") {
        router.push(Routes.me.dashboard);
      } else {
        router.push(Routes.role(role).dashboard);
      }
      router.refresh();
    } catch (err: unknown) {
      const message =
        err &&
        typeof err === "object" &&
        "data" in err &&
        err.data &&
        typeof (err.data as { message?: string }).message === "string"
          ? (err.data as { message: string }).message
          : "Invalid email or password.";
      toast.error(message);
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        Sign in
      </h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Enter your credentials to access your account.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="login-email">Email</Label>
          <Input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="login-password">Password</Label>
            <Link
              href="#"
              className="text-xs font-medium text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="login-password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            className="w-full"
          />
        </div>
        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      {/* Quick login with mock users (dev/demo only) */}
      <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Quick login (demo)
        </p>
        <div className="flex flex-wrap gap-2">
          {DEMO_ACCOUNTS.map((account) => (
            <Button
              key={account.email}
              type="button"
              variant="outline"
              size="sm"
              className="text-xs"
              disabled={isLoading}
              onClick={() => {
                setEmail(account.email);
                setPassword(account.password);
                toast.success(`Filled ${account.label}`);
              }}
            >
              {account.label}
            </Button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
        Don&apos;t have an account?{" "}
        <Link
          href={Routes.auth.signup}
          className="font-semibold text-primary hover:underline"
        >
          Sign up
        </Link>
      </p>
    </>
  );
}
