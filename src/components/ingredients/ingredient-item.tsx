import React, { useState, useRef, useEffect, useCallback } from "react";

import IngredientForm from "./ingredient-form";
import { Button } from "@/components/ui/button";
import { Ingredient } from "@/types";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";

type Props = {
  item: Ingredient;
};

export const IngredientItem = ({ item }: Props) => {
  const [dragging, setDragging] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [deleteVisible, setDeleteVisible] = useState<boolean>(false);

  const itemRef = useRef<HTMLDivElement>(null);

  const resetItem = useCallback(() => {
    setDeleteVisible(false);
  }, []);

  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    const startX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(startX);
    setDragging(true);
  };

  const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!dragging) return;
    const currentX = "touches" in e ? e.touches[0].clientX : e.clientX;

    if (dragStartX - currentX > 50) {
      setDeleteVisible(true);
    } else if (currentX - dragStartX > 50) {
      resetItem();
    }
  };

  const handleDragEnd = () => {
    setDragging(false);
    if (!deleteVisible) {
      resetItem();
    }
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (itemRef.current && !itemRef.current.contains(event.target as Node)) {
        resetItem();
      }
    },
    [resetItem]
  );

  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        resetItem();
      }
    },
    [resetItem]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [handleClickOutside, handleEscapeKey]);

  const deleteHandler = () => {
    console.log(item.name);
  };

  return (
    <div
      ref={itemRef}
      className="relative overflow-hidden flex flex-row items-center"
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
    >
      <div
        className={cn("relative transition-colors duration-400 ease-in-out", {
          "text-gray-400": deleteVisible,
          "text-black": !deleteVisible,
        })}
      >
        <IngredientForm type="update" ingredient={item} />
      </div>

      {deleteVisible && (
        <Button
          variant="destructive"
          onClick={deleteHandler}
          className="right-0 top-0 bottom-0 mt-[2px] absolute"
        >
          <Trash2 size={14} />
        </Button>
      )}
    </div>
  );
};
