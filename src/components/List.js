import { useSelector } from 'react-redux';
import Card from './Card';

function List() {
    const db = useSelector((state) => state.contacts.db);

    function renderList() {
        const db_arr = Object.entries(db);

        return db_arr.map(([id, rest]) => <Card key={id} id={id} {...rest} />);
    }
    return <div className="list-container">{renderList()}</div>;
}

export default List;
