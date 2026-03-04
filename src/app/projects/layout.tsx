import BackToPortfolioStrip from '@/components/BackToPortfolioStrip'

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BackToPortfolioStrip />
      {children}
    </>
  )
}
