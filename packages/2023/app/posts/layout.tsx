import { BodyContainer } from "../components/BodyContainer";
import { MainLayout } from "../components/MainLayout";

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout>
      <BodyContainer>{children}</BodyContainer>
    </MainLayout>
  );
}
