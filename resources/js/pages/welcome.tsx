import { Head } from '@inertiajs/react';
import {
    ArrowDown,
    ArrowUpRight,
    CalendarDays,
    Clock3,
    MapPin,
    Menu,
    X,
    Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import '../../css/birthday.css';

type EventData = {
    name: string;
    age: number;
    playerNumber: number;
    date: string;
    timezone: string;
    time: string;
    venue: string;
    address: string;
    reference: string;
    mapsUrl: string;
    image: string;
    layupImage: string;
    ballImage: string;
    profileImage: string;
    shotImage: string;
    closingImage: string;
};

function eventLabels(event: EventData) {
    const date = event.date ? new Date(event.date) : null;
    const valid = date !== null && Number.isFinite(date.getTime());
    return {
        date: valid
            ? new Intl.DateTimeFormat('es-MX', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                  timeZone: event.timezone,
              }).format(date)
            : 'Fecha por confirmar',
        time:
            event.time ||
            (valid
                ? new Intl.DateTimeFormat('es-MX', {
                      hour: 'numeric',
                      minute: '2-digit',
                      timeZone: event.timezone,
                  }).format(date)
                : 'Hora por confirmar'),
        venue: event.venue || 'Arena por confirmar',
    };
}

function Basketball({ className = '' }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
        >
            <circle cx="50" cy="50" r="46" />
            <path d="M4 50h92M50 4v92M18 17c43 17 43 49 0 66M82 17c-43 17-43 49 0 66" />
        </svg>
    );
}

function Navigation({ ballImage }: { ballImage: string }) {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const close = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpen(false);
                document.getElementById('menu-toggle')?.focus();
            }
        };
        document.addEventListener('keydown', close);
        return () => document.removeEventListener('keydown', close);
    }, []);
    return (
        <header className="capy-nav">
            <div className="nav-inner">
                <a
                    className="capy-logo"
                    href="#inicio"
                    aria-label="Capy 08, inicio"
                >
                    <img
                        className="logo-ball"
                        src={ballImage}
                        alt=""
                        width="32"
                        height="32"
                    />{' '}
                    CAPY <span>08</span>
                    <i />
                </a>
                <button
                    id="menu-toggle"
                    className="menu-toggle"
                    aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
                    aria-expanded={open}
                    aria-controls="birthday-nav"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X /> : <Menu />}
                </button>
                <nav
                    id="birthday-nav"
                    className={open ? 'nav-links is-open' : 'nav-links'}
                    aria-label="Navegación principal"
                >
                    {[
                        ['inicio', 'Inicio'],
                        ['detalles', 'Detalles'],
                        ['jugador', 'Jugador'],
                        ['arena', 'Arena'],
                    ].map(([id, label]) => (
                        <a
                            key={id}
                            href={`#${id}`}
                            onClick={() => setOpen(false)}
                        >
                            {label}
                        </a>
                    ))}
                </nav>
                <span className="nav-edition">
                    BIRTHDAY EDITION <span>↗</span>
                </span>
            </div>
        </header>
    );
}

function Hero({ event }: { event: EventData }) {
    const labels = eventLabels(event);
    return (
        <section id="inicio" className="capy-hero">
            <div className="hero-grid" aria-hidden="true" />
            <div className="hero-topline">
                <span>THE NEXT CHAPTER STARTS HERE</span>
                <span>EST. PLAYER 08 / EDITION {event.age}</span>
            </div>
            <div className="hero-copy">
                <p className="eyebrow hero-step-1">
                    <span className="status-dot" /> PLAYER{' '}
                    {String(event.playerNumber).padStart(2, '0')}{' '}
                    <span className="eyebrow-divider" /> BIRTHDAY EDITION
                </p>
                <h1 className="hero-step-2">
                    LEVEL <span>{event.age}</span>
                    <img
                        className="title-ball"
                        src={event.ballImage}
                        alt=""
                        aria-hidden="true"
                        width="1280"
                        height="1280"
                    />
                    <br />
                    <em>UNLOCKED</em>
                </h1>
                <div className="hero-name hero-step-2">
                    <strong>{event.name}</strong>
                    <span>
                        {event.age}TH
                        <br />
                        BIRTHDAY
                    </span>
                </div>
                <p className="hero-description hero-step-2">
                    Prepárate para el partido
                    <br />
                    más importante del año.
                </p>
                <a className="capy-button hero-step-5" href="#detalles">
                    ENTRA AL JUEGO <ArrowUpRight size={18} />
                </a>
                <div className="hero-event hero-step-5">
                    <div>
                        <CalendarDays />
                        <span>
                            FECHA<strong>{labels.date}</strong>
                        </span>
                    </div>
                    <div>
                        <Clock3 />
                        <span>
                            TIP-OFF<strong>{labels.time}</strong>
                        </span>
                    </div>
                    <div>
                        <MapPin />
                        <span>
                            LUGAR<strong>{labels.venue}</strong>
                        </span>
                    </div>
                </div>
            </div>
            <div className="hero-art">
                <span className="giant-age hero-step-3" aria-hidden="true">
                    {event.age}
                </span>
                <div className="arena-ring" aria-hidden="true" />
                <div className="hero-character hero-step-4">
                    <img
                        src={event.image}
                        alt="Capibara basquetbolista con lentes, balón y uniforme negro y rosa número 8"
                        fetchPriority="high"
                        width="1024"
                        height="1536"
                    />
                </div>
                <div className="overall-badge">
                    <strong>99</strong>
                    <span>OVR</span>
                    <Zap size={13} />
                </div>
                <div className="player-tag">
                    <span className="status-dot" />
                    <span>
                        CAPY HOOPER<small>BUILT FOR THE BIG NIGHT</small>
                    </span>
                    <b>#{event.playerNumber}</b>
                </div>
                <span className="art-caption">
                    SIGNATURE PLAYER · LEGENDARY ENERGY
                </span>
            </div>
            <a href="#detalles" className="scroll-cue">
                <ArrowDown size={14} /> SCROLL TO PLAY
            </a>
        </section>
    );
}

function SectionTitle({
    index,
    label,
    title,
}: {
    index: string;
    label: string;
    title: string;
}) {
    return (
        <div className="section-heading">
            <div>
                <p className="eyebrow">
                    <span>{index} /</span> {label}
                </p>
                <h2>{title}</h2>
            </div>
            <span className="section-cross" aria-hidden="true">
                +
            </span>
        </div>
    );
}

function GameDetails({ event }: { event: EventData }) {
    const labels = eventLabels(event);
    return (
        <section id="detalles" className="capy-section reveal">
            <SectionTitle
                index="01"
                label="THE BIG MATCH"
                title="GAME DETAILS"
            />
            <div className="match-presentation">
                <figure className="match-photo">
                    <img
                        src={event.shotImage}
                        alt="Capibara número 8 en el aire lanzando un triple"
                        loading="lazy"
                        width="1024"
                        height="1536"
                    />
                    <figcaption>
                        <span>08 / SIGNATURE MOVE</span>
                        <strong>MAKE IT COUNT.</strong>
                    </figcaption>
                </figure>
                <div className="scoreboard">
                    <div className="scoreboard-top">
                        <span>
                            <span className="status-dot" /> ONE NIGHT. ALL IN.
                        </span>
                        <span>EXHIBITION GAME / {event.age}</span>
                    </div>
                    <div className="matchup">
                        <div>
                            <span>HOME TEAM</span>
                            <strong>{event.name}</strong>
                        </div>
                        <b>VS</b>
                        <div>
                            <span>NEXT CHAPTER</span>
                            <strong>
                                LEVEL <em>{event.age}</em>
                            </strong>
                        </div>
                    </div>
                    <div className="scoreboard-details">
                        <div>
                            <Clock3 />
                            <span>
                                TIP-OFF<strong>{labels.time}</strong>
                            </span>
                        </div>
                        <div>
                            <CalendarDays />
                            <span>
                                DATE<strong>{labels.date}</strong>
                            </span>
                        </div>
                        <div>
                            <MapPin />
                            <span>
                                VENUE<strong>{labels.venue}</strong>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Countdown({ date }: { date: string }) {
    const birthdayDate = new Date(date).getTime();
    const [remaining, setRemaining] = useState<number | null>(null);
    useEffect(() => {
        if (!Number.isFinite(birthdayDate)) return;
        const update = () =>
            setRemaining(Math.max(0, birthdayDate - Date.now()));
        update();
        const timer = window.setInterval(update, 1000);
        return () => window.clearInterval(timer);
    }, [birthdayDate]);
    const total = remaining === null ? null : Math.floor(remaining / 1000);
    const values =
        total === null
            ? ['--', '--', '--', '--']
            : [
                  Math.floor(total / 86400),
                  Math.floor(total / 3600) % 24,
                  Math.floor(total / 60) % 60,
                  total % 60,
              ].map((value) => String(value).padStart(2, '0'));
    return (
        <section
            className="countdown-section reveal"
            aria-label="Cuenta regresiva"
        >
            <p className="eyebrow">THE WAIT IS PART OF THE GAME</p>
            <h2>GAME STARTS IN</h2>
            {remaining === 0 ? (
                <p className="game-time" role="status">
                    GAME TIME <Zap />
                </p>
            ) : (
                <div
                    className="countdown"
                    role="timer"
                    aria-label="Tiempo restante para el cumpleaños"
                >
                    {values.map((value, index) => (
                        <div key={index}>
                            <strong>{value}</strong>
                            <span>
                                {['DÍAS', 'HORAS', 'MIN', 'SEG'][index]}
                            </span>
                        </div>
                    ))}
                </div>
            )}
            <p className="countdown-note">
                {!Number.isFinite(birthdayDate)
                    ? 'La fecha del gran partido se anunciará pronto.'
                    : 'Cada segundo nos acerca a una noche legendaria.'}
            </p>
        </section>
    );
}

function PlayerProfile({ event }: { event: EventData }) {
    const stats: [string, number][] = [
        ['PARTY', 99],
        ['STYLE', 96],
        ['BASKETBALL', 94],
        ['CHILL', 100],
        ['ENERGY', 98],
        ['CAPY POWER', 100],
    ];
    return (
        <section id="jugador" className="capy-section profile-section reveal">
            <div className="player-card">
                <div className="card-shine" />
                <span className="card-overall">
                    <strong>99</strong>OVR
                </span>
                <span className="card-edition">
                    BIRTHDAY
                    <br />
                    EDITION
                </span>
                <Basketball className="card-ball" />
                <img
                    src={event.profileImage}
                    alt="Capy Hooper descansando en la banca con su jersey número 8"
                    loading="lazy"
                    width="1122"
                    height="1402"
                />
                <div className="card-bottom">
                    <span>
                        PLAYER {String(event.playerNumber).padStart(2, '0')}
                    </span>
                    <strong>{event.name}</strong>
                    <p>
                        {event.age} YEARS <i /> CAPY HOOPER <i /> #
                        {event.playerNumber}
                    </p>
                </div>
            </div>
            <div className="profile-copy">
                <p className="eyebrow">
                    <span>02 /</span> MEET THE MVP
                </p>
                <h2>
                    THE PLAYER.
                    <br />
                    <em>THE LEGEND.</em>
                </h2>
                <p>
                    Nuevo nivel. La misma esencia.
                    <br />
                    {event.name} cumple {event.age} y este partido se juega con
                    su mejor equipo: ustedes.
                </p>
                <div className="stats">
                    {stats.map(([label, value]) => (
                        <div className="stat" key={label}>
                            <span>
                                {label}
                                <b>{value}</b>
                            </span>
                            <div>
                                <i
                                    style={
                                        {
                                            '--stat': `${value}%`,
                                        } as CSSProperties
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="profile-signature">
                    <Zap size={15} /> LEGENDARY VIBES. MAXIMUM CAPY POWER.
                </div>
            </div>
        </section>
    );
}

function Location({ event }: { event: EventData }) {
    const mapsUrl = /^https?:\/\//i.test(event.mapsUrl)
        ? event.mapsUrl
        : event.address || event.venue
          ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([event.venue, event.address].filter(Boolean).join(', '))}`
          : '';
    return (
        <section id="arena" className="capy-section reveal">
            <SectionTitle
                index="03"
                label="THIS IS OUR HOME COURT"
                title="THE ARENA"
            />
            <div className="venue-card">
                <div className="venue-copy">
                    <span className="venue-icon">
                        <MapPin />
                    </span>
                    <p className="eyebrow">WHERE THE NIGHT HAPPENS</p>
                    <h3>{event.venue || 'La cancha está por revelarse.'}</h3>
                    <p>
                        {event.address ||
                            'Muy pronto compartiremos el lugar del gran partido.'}
                    </p>
                    {event.reference && <p>{event.reference}</p>}
                    {mapsUrl ? (
                        <a
                            className="capy-button"
                            href={mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            CÓMO LLEGAR <ArrowUpRight size={18} />
                        </a>
                    ) : (
                        <span className="location-pending">
                            UBICACIÓN POR CONFIRMAR <MapPin size={15} />
                        </span>
                    )}
                </div>
                <div className="court-visual court-with-player">
                    <img
                        className="arena-layup"
                        src={event.layupImage}
                        alt="Capibara con jersey número 8 saltando para hacer una bandeja"
                        loading="lazy"
                        width="1024"
                        height="1536"
                    />
                    <div className="basketball-court" aria-hidden="true">
                        <div className="court-mid" />
                        <div className="court-circle" />
                        <div className="court-key left" />
                        <div className="court-key right" />
                    </div>
                    <span className="court-caption">LIGHTS ON. GAME ON.</span>
                </div>
            </div>
        </section>
    );
}

function Closing({ event }: { event: EventData }) {
    return (
        <>
            <section className="closing-section reveal">
                <img
                    className="closing-player"
                    src={event.closingImage}
                    alt="Capibara de espaldas con el número 8 en su jersey"
                    loading="lazy"
                    width="1024"
                    height="1536"
                />
                <img
                    className="closing-ball"
                    src={event.ballImage}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    width="1280"
                    height="1280"
                />
                <div className="closing-number" aria-hidden="true">
                    {event.age}
                </div>
                <div className="closing-content">
                    <p className="eyebrow">
                        FINAL BUZZER? <span>NOT YET.</span>
                    </p>
                    <h2>
                        GOOD FRIENDS.
                        <br />
                        GREAT GAME.
                        <br />
                        <em>BIG NIGHT.</em>
                    </h2>
                    <p>Nos vemos en la cancha.</p>
                    <div className="closing-tags">
                        <span>#{event.playerNumber}</span>
                        <span>LEVEL {event.age}</span>
                        <span>CAPY HOOPER</span>
                    </div>
                </div>
            </section>
            <footer className="capy-footer">
                <a className="capy-logo" href="#inicio">
                    <img
                        className="logo-ball"
                        src={event.ballImage}
                        alt=""
                        width="32"
                        height="32"
                        loading="lazy"
                    />{' '}
                    CAPY <span>08</span>
                </a>
                <span>
                    {event.name.toUpperCase()} / {event.age}TH BIRTHDAY
                </span>
                <a href="#inicio">BACK TO TOP ↑</a>
            </footer>
        </>
    );
}

export default function Welcome({
    eventData,
    staticPage = false,
}: {
    eventData: EventData;
    staticPage?: boolean;
}) {
    useEffect(() => {
        const sections = document.querySelectorAll('.reveal');
        if (
            window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
            !('IntersectionObserver' in window)
        )
            return;
        const observer = new IntersectionObserver(
            (entries) =>
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                }),
            { threshold: 0.08 },
        );
        sections.forEach((section) => {
            section.classList.add('will-reveal');
            observer.observe(section);
        });
        return () => {
            observer.disconnect();
            sections.forEach((section) =>
                section.classList.remove('will-reveal'),
            );
        };
    }, []);
    return (
        <div className="birthday-page">
            {!staticPage && (
                <Head
                    title={`${eventData.name} cumple ${eventData.age} | Capy Basketball`}
                >
                    <meta
                        name="description"
                        content="Estás invitado al partido más importante del año."
                    />
                    <meta
                        property="og:title"
                        content={`${eventData.name} cumple ${eventData.age} | Capy Basketball`}
                    />
                    <meta
                        property="og:description"
                        content="Estás invitado al partido más importante del año."
                    />
                    <meta property="og:image" content={eventData.image} />
                    <meta property="og:type" content="website" />
                    <meta name="theme-color" content="#07070A" />
                </Head>
            )}
            <a className="skip-link" href="#contenido">
                Saltar al contenido
            </a>
            <Navigation ballImage={eventData.ballImage} />
            <main id="contenido">
                <Hero event={eventData} />
                <div className="edition-strip" aria-hidden="true">
                    <span>LEVEL {eventData.age} UNLOCKED</span>
                    <Basketball />
                    <span>NOT JUST A BIRTHDAY. A NEW ERA.</span>
                    <Basketball />
                    <span>CAPY HOOPER</span>
                    <Basketball />
                    <span>PLAYER 08</span>
                </div>
                <GameDetails event={eventData} />
                <Countdown date={eventData.date} />
                <PlayerProfile event={eventData} />
                <Location event={eventData} />
                <Closing event={eventData} />
            </main>
        </div>
    );
}
