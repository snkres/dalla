import { Dispatch, useState } from "react"
import { ProOnboardingData } from ".."
import Image from "next/image"
import { Button } from "@dallah/design-system"
import { Modal } from "@components/shared/modal"
import { ExperienceForm } from "./exp-form"
export function ProWizardStepThree({
  data,
  updateData,
  handleNext,
  onSubmit
}: {
  data: ProOnboardingData;
  updateData: Dispatch<React.SetStateAction<ProOnboardingData>>;
  handleNext: () => void
  onSubmit: () => void
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Handler for when the form is submitted
  const handleExperienceSubmit = (experience: ProOnboardingData['experience'][0]) => {
    updateData(prevData => ({
      ...prevData,
      experience: [...prevData.experience, experience]
    }));

    // Close the modal after adding experience
    setIsOpen(false);


    // Optionally, we could automatically proceed to the next step
    // handleNext();
  };

  return (
    <div className="flex flex-col gap-4 w-[43rem] px-6 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-1">
        <h1 className="text-text-xl font-semibold">Add Experience</h1>
        <p className="text-[#475467]">
          Share where you've worked on your profile.
        </p>
      </div>
      {
        data.experience.length > 0 ? (
          <div className="w-full mt-4">
            <h2 className="text-lg font-semibold mb-2">Entered Experiences</h2>
            <div className="space-y-2">
              {data.experience.map((exp, index) => (
                <div key={index} className="p-4 border rounded-lg border-slate-blue-50">
                  <p className="font-medium">{exp.title} at {exp.company}</p>
                  <p className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</p>
                  <p className="text-sm mt-1">{exp.location} • {exp.meta.employmentType}</p>
                </div>
              ))}
            </div>
          </div>

        ) : (
          <Image
            src='/exp.webp'
            alt="Exp"
            width={500}
            height={500}
          />
        )
      }
      <div className="flex gap-2 items-center w-full">
        <Button
          onClick={
            onSubmit
          }
          variant="outline"
          size="lg"
          className="shadow-[rgba(16, 24, 40, 0.18)] flex w-full items-center justify-center gap-[0.375rem] self-stretch rounded-[0.5rem] border-[0.05rem] border-solid stroke-[0.1px] px-[1rem] py-[10px] shadow-sm"
          type="submit"
          style={{
            boxShadow: '0px -1px 0px 0px rgba(16, 24, 40, 0.1) inset',
          }}
        >
          {
            data.experience.length > 0 ? 'Save' : 'Skip'
          }
        </Button>
        <Button
          variant="default"
          onClick={() => setIsOpen(true)}
          size="lg"
          className="text-sunshine-yellow-10 shadow-[rgba(16, 24, 40, 0.18)] flex w-full items-center justify-center gap-[0.375rem] self-stretch rounded-[0.5rem] border-[0.05rem] border-solid border-[#CEB67B] bg-coral-red-100 stroke-[0.1px] px-[1rem] py-[10px] shadow-sm"
          type="submit"
          style={{
            boxShadow: '0px -1px 0px 0px rgba(16, 24, 40, 0.1) inset',
          }}
        >
          Add Experience
        </Button>
      </div>



      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ExperienceForm
          onSubmit={handleExperienceSubmit}
          onCancel={() => setIsOpen(false)}
        />
      </Modal>
    </div>
  );
}
