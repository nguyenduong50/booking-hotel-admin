import {useRouteError} from 'react-router-dom';
import Header from '../../components/header/Header';
import classes from './ErrorPage.module.css';

const ErrorPage = () => {
    const error = useRouteError();

    let title = "An error occurred";
    let message = 'Something went wrong!';

    if(error.status === 500){
        message = error.data.message;
    }

    if(error.status === 404){
        title = 'Not found!';
        message = 'Could not find resource or page';
    }

    return(
        <>  
            <Header />
			<div className={classes['title-page-error']}>
				<h2>{title}</h2>
				<p>{message}</p>
			</div>
        </>

    )
}

export default ErrorPage;