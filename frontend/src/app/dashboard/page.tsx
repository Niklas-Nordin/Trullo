import style from './dashboard.module.css';

type Props = {
    isLoggedIn: boolean;
}

function dashboard({ isLoggedIn }: Props) {


    
  return (
    <div className={style.dashboardContainer}>
      <h1 className={style.title}>Dashboard</h1>
    </div>
  );
}

export default dashboard;