import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, AlertTriangle, X } from "lucide-react";

interface AllergenModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  allergens: string[];
}

const AllergenModal = ({
  isOpen,
  onClose,
  itemName,
  allergens,
}: AllergenModalProps) => {
  const allAllergens = [
    "Wheat",
    "Milk",
    "Eggs",
    "Soy",
    "Tree Nuts",
    "Peanuts",
    "Sesame",
    "Fish",
    "Shellfish",
  ];

  const getAllergenStatus = (allergen: string) => {
    return allergens.includes(allergen.toLowerCase());
  };

  const hasAllergens = allergens.length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Allergen Information - {itemName}
            <Button variant="ghost" size="sm" onClick={onClose} className="p-1">
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {hasAllergens && (
            <Alert className="border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                This item contains allergens. Please review carefully if you
                have food allergies.
              </AlertDescription>
            </Alert>
          )}

          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Info className="h-4 w-4 mr-2" />
              Allergen Detection Results
            </h3>

            <div className="grid grid-cols-3 gap-2">
              {allAllergens.map((allergen) => {
                const isPresent = getAllergenStatus(allergen);
                return (
                  <Badge
                    key={allergen}
                    variant={isPresent ? "destructive" : "secondary"}
                    className={`text-xs justify-center ${
                      isPresent
                        ? "bg-red-100 text-red-800 border-red-200"
                        : "bg-green-100 text-green-800 border-green-200"
                    }`}
                  >
                    {allergen}
                  </Badge>
                );
              })}
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Important Notes:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Allergens are auto-detected based on ingredients</li>
              <li>• Cross-contamination may occur in our kitchen</li>
              <li>• Please inform staff of severe allergies</li>
              <li>• When in doubt, please ask our team</li>
            </ul>
          </div>

          {hasAllergens && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-medium text-red-900 mb-2">
                Detected Allergens:
              </h4>
              <div className="flex flex-wrap gap-1">
                {allergens.map((allergen) => (
                  <Badge
                    key={allergen}
                    variant="destructive"
                    className="text-xs"
                  >
                    {allergen.charAt(0).toUpperCase() + allergen.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              For detailed ingredient lists or specific allergen questions,
              please contact us at{" "}
              <a
                href="tel:(908)933-0123"
                className="text-brand-pink hover:underline"
              >
                (908) 933-0123
              </a>
            </AlertDescription>
          </Alert>
        </div>

        <div className="flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AllergenModal;
