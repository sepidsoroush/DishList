// import { LoadingSpinner } from "@/components/ui/loading-spinner";
import NewIngredient from "@/components/ingredients/new-ingredient";
import { IngredientItem } from "@/components/ingredients/ingredient-item";
import { CardDescription } from "@/components/ui/card";

import { Ingredient } from "@/types";

type Props = {
  ingredients: Ingredient[];
};

function GroceryTab({ ingredients }: Props) {
  // const isLoading = useAppSelector<boolean>((state) => state.ui.loading);

  // if (isLoading) {
  //   return (
  //     <div className="w-full h-screen flex items-center place-content-center">
  //       <LoadingSpinner
  //         width={48}
  //         height={48}
  //         className="flex items-center place-content-center"
  //       />
  //     </div>
  //   );
  // }

  const availableIngredients = ingredients.filter((item) => item.available);
  const unavailableIngredients = ingredients.filter((item) => !item.available);

  return (
    <div className="flex flex-col h-screen">
      <ul className="flex-1 px-2">
        <CardDescription>Grocery list</CardDescription>
        {unavailableIngredients.map((item) => (
          <IngredientItem key={item.id} ingredient={item} />
        ))}
        {availableIngredients.map((item) => (
          <IngredientItem key={item.id} ingredient={item} />
        ))}
      </ul>
      <div className="sticky bottom-0 p-2">
        <NewIngredient />
      </div>
    </div>
  );
}

export default GroceryTab;
