import Header from "../Header";

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header argValue="햐소ㅕㅠ" returnValue="github" argType="string" />
      {children}
    </>
  )
}
