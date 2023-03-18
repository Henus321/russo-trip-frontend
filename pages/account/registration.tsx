import Link from "next/link";

import Layout from "@/components/Layout";

export default function RegistrationPage() {
  return (
    <Layout>
      <h1 className="text-5xl border-b-4 p-5 font-bold">Registration Page</h1>
      <p>
        Altready have an account?{" "}
        <Link className="text-red-500" href="/account/login">
          Login
        </Link>
      </p>
    </Layout>
  );
}
