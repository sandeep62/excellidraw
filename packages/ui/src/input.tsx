

interface UserInput {
    placeholder: string,
    size: "big" | "small",
    onChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void,
    type:"text"|"email"|"password",
    className?:string
  }
  
  export default function Input({ placeholder, size,onChange }: UserInput) {
    return (
      <div>
        <input
          className={`border rounded-md px-3 py-4 ${
            size === "big" ? "w-32 h-12" : "w-32 h-12"

          }`}
          placeholder={placeholder}
        />

      </div>
    );
  }
  