"use client";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Login</h1>
      <form>
        <Field>
          <Input type="email" placeholder="Email" />
        </Field>
        <Field>
          <Input type="password" placeholder="Password" />
        </Field>
        <Button>Login</Button>
      </form>
    </div>
  );
}
