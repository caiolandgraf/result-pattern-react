import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Result Pattern",
	description: "A safer approach for function returns in TypeScript",
	generator: "@caiolandgraf",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
