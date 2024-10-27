import { RocketIcon } from '@radix-ui/react-icons'

export function Logo() {
  return (
    <div className="flex w-full gap-x-2 items-center">
      <div className="bg-primary h-8 w-8 flex items-center justify-center rounded-md">
        <RocketIcon className="w-5 h-5 text-primary-foreground" />
      </div>
      <span className="text-sm font-bold">Tô Aqui!</span>
    </div>
  )
}
