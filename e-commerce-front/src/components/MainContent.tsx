import '../styles/MainContent.css'

export default function MainContent(props: {children?:React.JSX.Element}) {
    
    return (
        <>
        <main>
            {props.children}
        </main>
        </>
    )
}