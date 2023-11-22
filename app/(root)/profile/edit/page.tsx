import ProfileEditForm from "@/components/forms/Profile";
import { getUserByClerkId } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const EditProfile = async () => {
  const { userId: clerkId } = auth();
  if (!clerkId) redirect("/sign-in");
  const user = await getUserByClerkId({ userId: clerkId });
  if (!user) redirect("/");

  return (
    <div className="mx-auto w-full max-w-5xl">
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>
      <ProfileEditForm clerkId={clerkId} user={JSON.stringify(user)} />
    </div>
  );
};

export default EditProfile;
