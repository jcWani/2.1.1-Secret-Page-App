import DeleteAccountBtn from "@/components/auth/delete-account-btn";
import AppLayout from "@/components/ui/app-layout";
import { Card, CardContent } from "@/components/ui/card";
import ViewMessageBtn from "@/components/ui/view-msg-btn";

export default function SecretPage1() {
  return (
    <AppLayout>
      <div>
        <h1 className="text-2xl font-bold mb-4">Welcome to Secret Page One</h1>
      </div>

      <Card className="w-full max-w-lg">
        <CardContent className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Secret Message</h3>
              <p className="text-sm text-muted-foreground">
                Access your own secret message
              </p>
            </div>
            <ViewMessageBtn />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-medium">Delete account</h3>
              <p className="text-sm text-muted-foreground">
                Permanently remove your account. This action cannot be undone.
              </p>
            </div>
            <DeleteAccountBtn />
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
