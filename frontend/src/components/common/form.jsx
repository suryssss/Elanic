import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
  showTermsCheckbox = false,
  onTermsChange,
}) {
  const [showPassword, setShowPassword] = useState({});
  const togglePasswordVisibility = (fieldName) => {
    setShowPassword(prev => ({
      ...prev,
      [fieldName]: !prev[fieldName]
    }));
  };

  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        const isPassword = getControlItem.type === "password";
        const showPasswordForField = showPassword[getControlItem.name];
        
        element = (
          <div className="relative">
            <Input
              name={getControlItem.name}
              placeholder={getControlItem.placeholder}
              id={getControlItem.name}
              type={isPassword && showPasswordForField ? "text" : getControlItem.type}
              value={value}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [getControlItem.name]: event.target.value,
                })
              }
              className="pr-10"
            />
            {isPassword && (
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => togglePasswordVisibility(getControlItem.name)}
              >
                {showPasswordForField ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            )}
          </div>
        );

        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );

        break;
      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );

        break;

      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-4">
        {formControls.map((controlItem, index) => {
          // Check if this field should be in a side-by-side layout
          const isSideBySide = controlItem.sideBySide;
          const nextControl = formControls[index + 1];
          const shouldRenderSideBySide = isSideBySide && nextControl && nextControl.sideBySide;
          
          if (shouldRenderSideBySide) {
            return (
              <div key={`${controlItem.name}-${nextControl.name}`} className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-white">{controlItem.label}</Label>
                  {renderInputsByComponentType(controlItem)}
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-white">{nextControl.label}</Label>
                  {renderInputsByComponentType(nextControl)}
                </div>
              </div>
            );
          } else if (!controlItem.sideBySide || (controlItem.sideBySide && !nextControl?.sideBySide)) {
            return (
              <div className="space-y-1.5" key={controlItem.name}>
                <Label className="text-sm font-medium text-white">{controlItem.label}</Label>
                {renderInputsByComponentType(controlItem)}
              </div>
            );
          }
          return null;
        })}
      </div>

      {showTermsCheckbox && (
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="terms"
            className="h-4 w-4 rounded   text-[#6D54B5] focus:ring-[#6D54B5]"
            onChange={onTermsChange}
          />
        </div>
      )}

      <Button 
        disabled={isBtnDisabled} 
        type="submit" 
        className="h-12 w-full bg-[#6D54B5] text-white font-medium hover:bg-[#5a4a9a] transition-colors"
      >
        {buttonText || "Submit"}
      </Button>

      
    </form>
  );
}

export default CommonForm;