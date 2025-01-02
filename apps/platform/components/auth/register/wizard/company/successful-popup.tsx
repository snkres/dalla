import { Button } from '@dallah/design-system'

export function SuccessfulPopUp() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center justify-center gap-4 rounded-3xl bg-white px-8 py-8">
      <svg
        className="h-8 w-8"
        viewBox="0 0 46 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23 43.375C15.2734 43.375 8.21875 39.3438 4.35547 32.625C0.492188 25.9902 0.492188 17.8438 4.35547 11.125C8.21875 4.49023 15.2734 0.375 23 0.375C30.6426 0.375 37.6973 4.49023 41.5605 11.125C45.4238 17.8438 45.4238 25.9902 41.5605 32.625C37.6973 39.3438 30.6426 43.375 23 43.375ZM32.4902 17.9277H32.4062C33.2461 17.1719 33.2461 15.9121 32.4062 15.0723C31.6504 14.3164 30.3906 14.3164 29.6348 15.0723L20.3125 24.4785L16.3652 20.5312C15.5254 19.6914 14.2656 19.6914 13.5098 20.5312C12.6699 21.2871 12.6699 22.5469 13.5098 23.3027L18.8848 28.6777C19.6406 29.5176 20.9004 29.5176 21.7402 28.6777L32.4902 17.9277Z"
          fill="#234D64"
        />
      </svg>
      <h2 className="text-text-2xl text-slate-blue font-bold">
        Profile Setup Complete!
      </h2>
      <p className="text-paragraph-lg text-center text-[#A3A3A3]">
        Your profile is ready! <br /> Start exploring opportunities now. 🙌
      </p>
      <Button className="flex w-full items-center rounded-xl">
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.9375 7.5625C12.9375 5.55859 11.8477 3.73047 10.125 2.71094C8.36719 1.69141 6.22266 1.69141 4.5 2.71094C2.74219 3.73047 1.6875 5.55859 1.6875 7.5625C1.6875 9.60156 2.74219 11.4297 4.5 12.4492C6.22266 13.4688 8.36719 13.4688 10.125 12.4492C11.8477 11.4297 12.9375 9.60156 12.9375 7.5625ZM11.8477 13.3281C10.582 14.3125 9 14.875 7.3125 14.875C3.26953 14.875 0 11.6055 0 7.5625C0 3.55469 3.26953 0.25 7.3125 0.25C11.3203 0.25 14.625 3.55469 14.625 7.5625C14.625 9.28516 14.0273 10.8672 13.043 12.1328L17.7539 16.8086C18.0703 17.1602 18.0703 17.6875 17.7539 18.0039C17.4023 18.3555 16.875 18.3555 16.5586 18.0039L11.8477 13.3281Z"
            fill="white"
          />
        </svg>

        <span className="text-text-sm font-bold">Explore Projects</span>
      </Button>
    </div>
  )
}
