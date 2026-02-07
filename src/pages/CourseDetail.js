import { useParams } from 'react-router-dom'

export default function CourseDetail() {
    const { id } = useParams()

    return (
        <div>
            <h1>Course Detail Page</h1>
            <p>Course ID: {id}</p>
        </div>
    )
}
