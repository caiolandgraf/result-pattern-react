"use client";

import type React from "react";

import { useState } from "react";
import { ResultUtils } from "../lib/result";
import { Email } from "../lib/validators/email";
import { PersonName } from "../lib/validators/person-name";
import { StrongPassword } from "../lib/validators/strong-password";

interface FormData {
	name: string;
	email: string;
	password: string;
}

export default function UserRegistration() {
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState<string[]>([]);
	const [success, setSuccess] = useState<boolean>(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setErrors([]);
		setSuccess(false);

		// Validation using Result pattern
		const name = PersonName.try(formData.name);
		const email = Email.try(formData.email);
		const password = StrongPassword.try(formData.password);

		// Combining results
		const result = ResultUtils.combine(name, email, password);

		if (result.isFail) {
			// Flatten and process error messages
			const errorMessages = result.value.flatMap((error) => {
				if (Array.isArray(error)) return error;
				return [error];
			});
			setErrors(errorMessages);
			return;
		}

		// If we got here, all data is valid
		setSuccess(true);
		const [validName, validEmail, validPassword] = result.value;
		console.log("Valid data:", {
			name: validName.toString(),
			email: validEmail.toString(),
			password: "********", // We don't display the password for security
		});

		// Here you could send the data to the server
	};

	return (
		<div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
			<h1 className="text-2xl font-bold mb-6 text-center">User Registration</h1>

			{success && (
				<div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
					Registration completed successfully!
				</div>
			)}

			{errors.length > 0 && (
				<div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
					<ul className="list-disc pl-5">
						{errors.map((error) => (
							<li key={`error-${error}`}>{error}</li>
						))}
					</ul>
				</div>
			)}

			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label
						htmlFor="name"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Name
					</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div className="mb-6">
					<label
						htmlFor="password"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Password
					</label>
					<input
						type="password"
						id="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<button
					type="submit"
					className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					Register
				</button>
			</form>
		</div>
	);
}
