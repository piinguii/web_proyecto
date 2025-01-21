// components/DeliveryNotes/DeliveryNotesList.jsx
import Link from 'next/link';
import DownloadDeliveryNote from './DownloadDeliveryNote';

const DeliveryNotesList = ({ deliveryNotes }) => {
  return (
    <div>
      <h2 className="text-xl font-bold pb-4">Lista de Albaranes</h2>
      <ul>
        {deliveryNotes.map((note) => (
          <li key={note._id}>
            <div>
              <h3>{note.description}</h3>
              <p>Proyecto: {note.projectId}</p>
              <DownloadDeliveryNote noteId={note._id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeliveryNotesList;
