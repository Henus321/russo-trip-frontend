import Link from "next/link";

import Layout from "@/components/Layout";

export default function LoginPage() {
  return (
    <Layout>
      <h1 className="text-5xl border-b-4 p-5 font-bold">Login Page</h1>
      <p>
        Don&apos;t have an account?{" "}
        <Link className="text-red-500" href="/account/registration">
          Register
        </Link>
      </p>
    </Layout>
  );
}
