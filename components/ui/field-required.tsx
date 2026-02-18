import { FieldLabel } from "./field"



interface FieldRequiredProps {
  children: React.ReactNode
}

const FieldRequired = ({ children }: FieldRequiredProps) => (
    <FieldLabel className="gap-0">
        {children}
        <span className="text-red-500">*</span>
    </FieldLabel>
)

export default FieldRequired 