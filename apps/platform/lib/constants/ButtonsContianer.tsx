import { Button } from "@dallah/design-system";

interface ButtonsContainerProps {
    handlePrevious: () => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    isSubmitting: boolean;
    previousText: string;
    continueText: string;
}

export const ButtonsContainer = ({
    handlePrevious,
    handleSubmit,
    isSubmitting,
    previousText,
    continueText
}: ButtonsContainerProps) => {
    return (
        <div className="flex justify-between gap-4 mt-12">
            <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                className="w-full"
            >
                {previousText}
            </Button>
            <Button
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="w-full bg-[#234d64] hover:bg-[#1a3b4d] text-white"
            >
                {continueText}
            </Button>
        </div>
    );
};