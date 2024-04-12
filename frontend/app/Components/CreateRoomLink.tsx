import React from "react";
import { useRouter } from "next/navigation";

const CreateRoomLink: React.FC = () => {
  let router = useRouter();

  const navigateToCreateRoom = () => {
    router.push("/rooms/create");
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={navigateToCreateRoom}
    >
      Create New Room
    </button>
  );
};

export default CreateRoomLink;
