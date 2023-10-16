"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as z from "zod";

const signupSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(4).max(20),
  gender: z.enum(["Male", "Female", "Other"]),
});

type FormData = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(signupSchema),
  });

  // Form submission function
  async function onSubmit(data: FormData) {
    console.log(isSubmitting);
    console.log(data);
    // Replace this with a server action or fetch an API endpoint to register the user
    // await new Promise<void>((resolve) => {
    //   setTimeout(() => {
    //     resolve();
    //   }, 2000); // Simulating a delay, replace with actual registration logic
    // });
    router.push("/login"); // Redirect to login page after successful signup
  }

  return (
    <div className="selection:bg-rose-500 selection:text-white">
      <div className="flex min-h-screen items-center justify-center bg-rose-100">
        <div className="flex-1 p-8">
          <div className="mx-auto w-96 overflow-hidden rounded-3xl bg-white shadow-xl">
            {/* Form Header */}
            <div className="rounded-bl-4xl relative h-44 bg-rose-500">
              <svg
                className="absolute bottom-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
              >
                <path
                  fill="#ffffff"
                  fillOpacity="1"
                  d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
              </svg>
            </div>

            {/* Form Body */}
            <div className="rounded-tr-4xl bg-white px-10 pb-8 pt-4">
              <h1 className="text-2xl font-semibold text-gray-900">Create your account</h1>
              <form
                className="mt-12"
                action=""
                method="POST"
                onSubmit={handleSubmit(onSubmit)}
                data-testid="form"
              >
                {/* Name Input */}
                <div className="relative">
                  <input
                    {...register("name")}
                    id="name"
                    name="name"
                    type="text"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
                    placeholder="John Doe"
                    autoComplete="off"
                  />
                  {errors?.name && (
                    <p className="text-red-600 text-sm">
                      {errors?.name?.message}
                    </p>
                  )}
                  <label
                    htmlFor="name"
                    className="absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                  >
                    Full Name
                  </label>
                </div>

                {/* Email Input */}
                <div className="relative mt-4">
                  <input
                    {...register("email", { required: true })}
                    id="email"
                    name="email"
                    type="text"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
                    placeholder="john@doe.com"
                    autoComplete="off"
                  />
                  {errors?.email && (
                    <p className="text-red-600 text-sm">
                      {errors?.email?.message}
                    </p>
                  )}
                  <label
                    htmlFor="email"
                    className="absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                  >
                    Email address
                  </label>
                </div>

                {/* Password Input */}
                <div className="relative mt-4">
                  <input
                    {...register("password", { required: true })}
                    id="password"
                    type="password"
                    name="password"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
                    placeholder="Password"
                    autoComplete="off"
                  />
                  {errors?.password && (
                    <p className="text-red-600 text-sm">
                      {errors?.password?.message}
                    </p>
                  )}
                  <label
                    htmlFor="password"
                    className="absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                  >
                    Password
                  </label>
                </div>

                {/* Username Input */}
                <div className="relative mt-4">
                  <input
                    {...register("username", { required: true })}
                    id="username"
                    name="username"
                    type="text"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
                    placeholder="johndoe123"
                    autoComplete="off"
                  />
                  {errors?.username && (
                    <p className="text-red-600 text-sm">
                      {errors?.username?.message}
                    </p>
                  )}
                  <label
                    htmlFor="username"
                    className="absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                  >
                    Username
                  </label>
                </div>

                {/* Gender Input */}
                <div className="relative mt-4">
                  <select
                    {...register("gender", { required: true })}
                    id="gender"
                    name="gender"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
                  >
                    <option value="" disabled>
                      Select gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors?.gender && (
                    <p className="text-red-600 text-sm">
                      {errors?.gender?.message}
                    </p>
                  )}
                  <label
                    htmlFor="gender"
                    className="absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                  >
                    Gender
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  data-testid="submit-btn"
                  disabled={!isDirty || !isValid || isSubmitting}
                  className="mt-8 block w-full cursor-pointer rounded bg-rose-500 px-4 py-2 text-center font-semibold text-white hover:bg-rose-400 focus:outline-none focus:ring focus:ring-rose-500 focus:ring-opacity-80 focus:ring-offset-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="inline w-6 h-6 mr-2 text-white animate-spin fill-rose-600 opacity-100"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* SVG for Spinner Animation */}
                      </svg>
                    </div>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </form>
              <div className="mt-4 flex justify-center gap-4">
                <span className="mt-1 block text-center text-sm font-medium text-rose-600">
                  Already have account?
                </span>
                <Link
                  className="block text-center text-sm font-medium text-rose-600 underline hover:bg-rose-100 px-2 py-0.5 rounded hover:underline focus:outline-none focus:ring-2 focus:ring-rose-500"
                  href="/"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
