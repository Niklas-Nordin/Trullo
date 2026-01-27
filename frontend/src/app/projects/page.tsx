import Link from 'next/link';
import style from "./projects.module.css"

function projects() {
  return (
    <div className={style.projectsContainer}>
      <Link href="/projects/create">Create Project +</Link>
    </div>
  );
}

export default projects;