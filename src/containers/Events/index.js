import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
    const { data, error } = useData();
    const [type, setType] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    // Filtre les événements en fonction du type sélectionné
    const filteredEvents = type
        ? data?.events.filter((event) => event.type === type) // Si un type est sélectionné, filtre les événements ayant ce type
        : data?.events || []; // Sinon, si aucun type n'est sélectionné ou si les données sont null/undefined, initialise filteredEvents avec un tableau vide

    // Pagination des événements filtrés
    const paginatedEvents = filteredEvents.filter(
        (event, index) =>
            (currentPage - 1) * PER_PAGE <= index && // Vérifie si l'index de l'événement est supérieur ou égal à l'index de début de page
            index < currentPage * PER_PAGE // Vérifie si l'index de l'événement est inférieur à l'index de fin de page
    );

    const changeType = (evtType) => {
        setCurrentPage(1);
        setType(evtType);
    };

    const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE); // jais enlever le +1 pour avoir le nombre de page complet
    const typeList = new Set(data?.events.map((event) => event.type));

    return (
        <>
            {error && <div>An error occured</div>}
            {data === null ? (
                "loading"
            ) : (
                <>
                    <h3 className="SelectTitle">Catégories</h3>
                    <Select
                        selection={Array.from(typeList)}
                        onChange={(value) =>
                            value ? changeType(value) : changeType(null)
                        }
                    />

                    <div id="events" className="ListContainer">
                        {paginatedEvents.map((event) => (
                            <Modal
                                key={event.id}
                                Content={<ModalEvent event={event} />}
                            >
                                {({ setIsOpened }) => (
                                    <EventCard
                                        onClick={() => setIsOpened(true)}
                                        imageSrc={event.cover}
                                        title={event.title}
                                        date={new Date(event.date)}
                                        label={event.type}
                                    />
                                )}
                            </Modal>
                        ))}
                    </div>
                    <div className="Pagination">
                        {[...Array(pageNumber || 0)].map((_, n) => (
                            <a
                                key={`page-${n + 1}`}
                                href="#events"
                                onClick={() => setCurrentPage(n + 1)}
                            >
                                {n + 1}
                            </a>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

export default EventList;
