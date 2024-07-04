import "./style.css"

export default function RedirectButton({label, href}: Prop) {
  return (
    <a href={href} className="redirect-button-component">
      <button>{label}</button>
    </a>
  )
}

type Prop = {
  label: string,
  href: string,
}
