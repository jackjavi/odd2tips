"use client";

import React from "react";
import Link from "next/link";

interface VisitRoomButtonProps {
  roomId: string;
  adminId: string;
  roomTitle: string;
}

const VisitRoomButton: React.FC<VisitRoomButtonProps> = ({
  roomId,
  adminId,
  roomTitle,
}) => {
  return (
    <Link
      href={`/rooms/${encodeURIComponent(
        roomTitle
      )}?roomId=${roomId}&adminId=${adminId}&roomTitle=${roomTitle}`}
    >
      <button className="text-sm md:text-md mt-4 px-4 py-2 bg-slate-400 text-white rounded hover:bg-slate-200 transition-colors">
        Visit Room
      </button>
    </Link>
  );
};

export default VisitRoomButton;
