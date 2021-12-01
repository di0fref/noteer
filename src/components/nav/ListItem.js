import {useDrag} from "react-dnd";
import {ItemTypes} from "../Constants";

function ListItem(props, {isDragging, id_}){
    const [{opacity}, dragRef] = useDrag(
        () => ({

            type: ItemTypes.CARD,
            item: props.items,
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0.1 : 1,
            }),
            end: (item, monitor) => {
                const dropResult = monitor.getDropResult();
                if (item && dropResult) {

                    console.log(item)
                    console.log(dropResult)
                    // NotesService.updateCategory(item.note.id, {
                    //     category_id: dropResult.category_id,
                    // }).then((result) => {
                    //     props.noteDropped();
                    // }).catch((err) => {
                    //     console.log(err);
                    // });
                }
            },
        }), []
    );



    return(
        <></>
    )
}
export default ListItem;