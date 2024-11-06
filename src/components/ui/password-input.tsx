'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'
import { ComponentProps, forwardRef, useState } from 'react'

interface PasswordInputProps extends ComponentProps<typeof Input> {
  error?: string
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ error, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <div className="space-y-2">
        <div className="relative">
          <Input
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            className={`text-black ${className}`}
            {...props}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? (
              <EyeOff className="size-5 text-black" />
            ) : (
              <Eye className="size-5 text-black" />
            )}
          </Button>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    )
  }
)

PasswordInput.displayName = 'PasswordInput' 