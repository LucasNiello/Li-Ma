import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Church,
  Calendar,
  MessageCircle,
  FileText,
  Users,
  Phone,
  MapPin,
  Send,
  Menu,
  X
} from "lucide-react";

// =============================================
//  Protótipo de site: Igreja Santo Antônio
//  Single-File React + Tailwind (preview no Canvas)
//  Objetivo: páginas de informações, eventos/quermesses,
//  cadastro de mensagens e matrículas em atividades/eventos.
// =============================================

const brand = "Igreja Santo Antônio";

const navItems = [
  { id: "home", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "horarios", label: "Horários" },
  { id: "eventos", label: "Eventos & Quermesse" },
  { id: "matriculas", label: "Matrículas" },
  { id: "mensagens", label: "Mensagens" },
  { id: "contato", label: "Contato" },
];

const baseCard = "rounded-2xl shadow-md p-6 bg-white/70 backdrop-blur border border-gray-100";
const baseInput =
  "w-full rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3 outline-none";
const baseLabel = "block text-sm font-medium text-gray-700 mb-1";
const baseBtn =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-medium shadow-sm transition hover:shadow group disabled:opacity-50 disabled:cursor-not-allowed";

const Section = ({ id, title, icon: Icon, children }) => (
  <section id={id} className="py-14" aria-labelledby={`${id}-title`}>
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex items-center gap-3 mb-6">
        {Icon && (
          <div className="h-10 w-10 rounded-xl grid place-items-center bg-indigo-50 text-indigo-600">
            <Icon size={22} />
          </div>
        )}
        <h2 id={`${id}-title`} className="text-2xl md:text-3xl font-semibold">
          {title}
        </h2>
      </div>
      {children}
    </div>
  </section>
);

const Hero = ({ onGoTo }) => (
  <div className="relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-500 to-indigo-400" />
    <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28 text-white">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl font-bold tracking-tight"
      >
        {brand}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-4 text-white/90 max-w-2xl"
      >
        Bem-vindo! Este é o site da nossa comunidade. Aqui você encontra horários de
        missas e confissões, informações sobre a paróquia, quermesse e eventos — e
        pode se inscrever em atividades ou enviar comentários e sugestões.
      </motion.p>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          onClick={() => onGoTo("eventos")}
          className={`${baseBtn} bg-white text-indigo-700 hover:-translate-y-0.5`}
        >
          <Calendar size={18} /> Ver próximos eventos
        </button>
        <button
          onClick={() => onGoTo("matriculas")}
          className={`${baseBtn} bg-indigo-800/40 text-white border border-white/30 hover:-translate-y-0.5`}
        >
          <FileText size={18} /> Fazer matrícula
        </button>
      </div>
    </div>
    <svg
      aria-hidden
      className="block w-full"
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
    >
      <path fill="#fff" d="M0,64L120,53.3C240,43,480,21,720,26.7C960,32,1200,64,1320,80L1440,96L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z" />
    </svg>
  </div>
);

const Nav = ({ current, setCurrent }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
  }, [current]);

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <button
          onClick={() => setCurrent("home")}
          className="flex items-center gap-2 font-semibold text-gray-800"
        >
          <Church size={22} className="text-indigo-600" />
          <span className="hidden sm:inline">{brand}</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrent(item.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition hover:bg-indigo-50 hover:text-indigo-700 ${
                current === item.id ? "bg-indigo-100 text-indigo-700" : "text-gray-700"
              }`}
              aria-current={current === item.id ? "page" : undefined}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-gray-100"
          >
            <div className="px-4 py-2 grid gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrent(item.id)}
                  className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition hover:bg-indigo-50 hover:text-indigo-700 ${
                    current === item.id ? "bg-indigo-100 text-indigo-700" : "text-gray-700"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

// ===== Dados de exemplo =====
const useEventos = () => {
  return useMemo(
    () => [
      {
        id: "quermesse-1",
        titulo: "Quermesse de Santo Antônio",
        data: "14–16 de junho",
        descricao:
          "Barracas, música ao vivo e bingo solidário. Venha celebrar e ajudar nossas obras sociais!",
        local: "Pátio da paróquia",
      },
      {
        id: "retiro-juventude",
        titulo: "Retiro da Juventude",
        data: "20 de julho",
        descricao:
          "Um dia de espiritualidade e integração para adolescentes e jovens (14–25 anos).",
        local: "Casa de Retiro São José",
      },
      {
        id: "curso-noivos",
        titulo: "Curso de Noivos",
        data: "03 e 10 de agosto",
        descricao:
          "Preparação para o sacramento do Matrimônio. Vagas limitadas, certificado ao final.",
        local: "Salão paroquial",
      },
    ],
    []
  );
};

// ===== Utilidades de armazenamento local (sem backend) =====
const storage = {
  push(key, value) {
    try {
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      existing.push({ ...value, _createdAt: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(existing));
      return true;
    } catch (e) {
      console.error("Erro ao gravar no localStorage", e);
      return false;
    }
  },
  list(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || "[]");
    } catch (e) {
      return [];
    }
  },
};

// ===== Formulários =====
function FormMensagem() {
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr("");

    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());

    // Validação básica
    if (!data.nome || !data.tipo || !data.mensagem) {
      setErr("Preencha nome, tipo de mensagem e o conteúdo.");
      return;
    }
    if (!data.consent) {
      setErr("Confirme o consentimento para envio e armazenamento da mensagem.");
      return;
    }

    setSubmitting(true);
    const saved = storage.push("mensagens", data);
    setSubmitting(false);

    if (saved) {
      setOk("Mensagem enviada com sucesso! Obrigado por compartilhar.");
      e.currentTarget.reset();
    } else {
      setErr("Não foi possível enviar agora. Tente novamente.");
    }
  };

  const recent = storage.list("mensagens").slice(-3).reverse();

  return (
    <div className={`${baseCard}`}>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
        <div>
          <label className={baseLabel} htmlFor="nome">Nome *</label>
          <input className={baseInput} id="nome" name="nome" required placeholder="Seu nome" />
        </div>
        <div>
          <label className={baseLabel} htmlFor="email">E-mail</label>
          <input className={baseInput} id="email" name="email" type="email" placeholder="seu@email.com" />
        </div>
        <div>
          <label className={baseLabel} htmlFor="telefone">Telefone</label>
          <input className={baseInput} id="telefone" name="telefone" placeholder="(11) 90000-0000" />
        </div>
        <div>
          <label className={baseLabel} htmlFor="tipo">Tipo *</label>
          <select className={baseInput} id="tipo" name="tipo" defaultValue="" required>
            <option value="" disabled>
              Selecione
            </option>
            <option>Comentário</option>
            <option>Sugestão</option>
            <option>Pedido de oração</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className={baseLabel} htmlFor="assunto">Assunto</label>
          <input className={baseInput} id="assunto" name="assunto" placeholder="Assunto da mensagem" />
        </div>
        <div className="md:col-span-2">
          <label className={baseLabel} htmlFor="mensagem">Mensagem *</label>
          <textarea className={`${baseInput} min-h-[140px]`} id="mensagem" name="mensagem" required placeholder="Escreva sua mensagem aqui..." />
        </div>
        <div className="md:col-span-2 flex items-start gap-2">
          <input id="consent" name="consent" type="checkbox" className="mt-1" />
          <label htmlFor="consent" className="text-sm text-gray-600">
            Autorizo o armazenamento dos meus dados para retorno do contato, conforme a finalidade do formulário.
          </label>
        </div>
        <div className="md:col-span-2 flex items-center gap-3">
          <button disabled={submitting} className={`${baseBtn} bg-indigo-600 text-white`}> 
            <Send size={18} /> Enviar mensagem
          </button>
          {submitting && <span className="text-sm text-gray-500">Enviando…</span>}
          {ok && <span className="text-sm text-emerald-600">{ok}</span>}
          {err && <span className="text-sm text-rose-600">{err}</span>}
        </div>
      </form>

      <div className="mt-8 border-t pt-6">
        <h4 className="font-semibold mb-3 text-gray-800">Envios recentes (apenas neste navegador)</h4>
        <ul className="grid sm:grid-cols-2 gap-3">
          {recent.map((m, idx) => (
            <li key={idx} className="rounded-xl border p-4 bg-white">
              <p className="text-xs text-gray-500">{new Date(m._createdAt).toLocaleString()}</p>
              <p className="font-medium">{m.nome} — <span className="text-indigo-700">{m.tipo}</span></p>
              {m.assunto && <p className="text-sm text-gray-700">Assunto: {m.assunto}</p>}
              <p className="text-sm text-gray-700 mt-1 line-clamp-3">{m.mensagem}</p>
            </li>
          ))}
          {recent.length === 0 && (
            <li className="text-sm text-gray-500">Nenhuma mensagem enviada ainda.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

function FormMatricula({ preSelecionada }) {
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr("");
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    if (!data.nome || !data.atividade || !data.contato) {
      setErr("Preencha nome, atividade e um contato (e-mail ou telefone).");
      return;
    }

    setSubmitting(true);
    const saved = storage.push("matriculas", data);
    setSubmitting(false);

    if (saved) {
      setOk("Inscrição registrada! Em breve a secretaria entrará em contato.");
      e.currentTarget.reset();
    } else {
      setErr("Não foi possível enviar agora. Tente novamente.");
    }
  };

  return (
    <div className={`${baseCard}`}>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
        <div>
          <label className={baseLabel} htmlFor="nome">Nome completo *</label>
          <input className={baseInput} id="nome" name="nome" required placeholder="Seu nome" />
        </div>
        <div>
          <label className={baseLabel} htmlFor="contato">E-mail ou telefone *</label>
          <input className={baseInput} id="contato" name="contato" required placeholder="(11) 90000-0000 ou seu@email.com" />
        </div>
        <div>
          <label className={baseLabel} htmlFor="atividade">Evento/atividade *</label>
          <select className={baseInput} id="atividade" name="atividade" defaultValue={preSelecionada || ""} required>
            <option value="" disabled>
              Selecione
            </option>
            <option>Quermesse — voluntariado</option>
            <option>Catequese — crianças</option>
            <option>Catequese — adultos (Catecumenato)</option>
            <option>Crisma</option>
            <option>Curso de Noivos</option>
            <option>Grupo de Jovens</option>
            <option>Coro/Ministério de Música</option>
            <option>Pastoral da Caridade</option>
            <option>Retiro da Juventude</option>
          </select>
        </div>
        <div>
          <label className={baseLabel} htmlFor="observacoes">Observações</label>
          <input className={baseInput} id="observacoes" name="observacoes" placeholder="Informações adicionais" />
        </div>
        <div className="md:col-span-2">
          <button disabled={submitting} className={`${baseBtn} bg-indigo-600 text-white`}>
            <FileText size={18} /> Enviar inscrição
          </button>
          {submitting && <span className="ml-3 text-sm text-gray-500">Enviando…</span>}
          {ok && <span className="ml-3 text-sm text-emerald-600">{ok}</span>}
          {err && <span className="ml-3 text-sm text-rose-600">{err}</span>}
        </div>
      </form>
    </div>
  );
}

// ===== Seções de conteúdo =====
const HomeSection = ({ onGoTo }) => (
  <div>
    <Hero onGoTo={onGoTo} />

    <section className="-mt-6 pb-10">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-4">
        <div className={`${baseCard}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl grid place-items-center bg-indigo-50 text-indigo-600">
              <Calendar size={20} />
            </div>
            <h3 className="font-semibold">Próximas Missas</h3>
          </div>
          <ul className="text-sm text-gray-700 leading-7">
            <li>Domingo — 8h, 10h, 18h</li>
            <li>Sábado — 18h (missa vespertina)</li>
            <li>Segunda a Sexta — 19h</li>
          </ul>
        </div>

        <div className={`${baseCard}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl grid place-items-center bg-indigo-50 text-indigo-600">
              <Users size={20} />
            </div>
            <h3 className="font-semibold">Pastorais</h3>
          </div>
          <p className="text-sm text-gray-700">Catequese, Música, Juventude, Caridade, Liturgia e mais. Faça parte!</p>
          <button onClick={() => onGoTo("matriculas")} className={`${baseBtn} mt-3 bg-indigo-600 text-white`}>
            Inscreva-se
          </button>
        </div>

        <div className={`${baseCard}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl grid place-items-center bg-indigo-50 text-indigo-600">
              <MessageCircle size={20} />
            </div>
            <h3 className="font-semibold">Envie sua mensagem</h3>
          </div>
          <p className="text-sm text-gray-700">Comentários, sugestões ou pedidos de oração. Estamos ouvindo.</p>
          <button onClick={() => onGoTo("mensagens")} className={`${baseBtn} mt-3 bg-white border text-indigo-700`}>
            Falar com a paróquia
          </button>
        </div>
      </div>
    </section>
  </div>
);

const SobreSection = () => (
  <Section id="sobre" title="Sobre a Paróquia" icon={Church}>
    <div className="grid md:grid-cols-2 gap-6">
      <div className={`${baseCard}`}>
        <h3 className="text-lg font-semibold mb-2">Nossa história</h3>
        <p className="text-gray-700 leading-7">
          A Paróquia Santo Antônio é uma comunidade acolhedora dedicada à vivência do
          Evangelho e ao serviço aos irmãos. Celebramos a fé por meio dos sacramentos,
          da caridade e da missão.
        </p>
      </div>
      <div className={`${baseCard}`}>
        <h3 className="text-lg font-semibold mb-2">Missão e valores</h3>
        <ul className="text-gray-700 leading-7 list-disc pl-5">
          <li>Evangelização e vida sacramental</li>
          <li>Formação cristã de crianças, jovens e adultos</li>
          <li>Caridade e promoção humana</li>
          <li>Comunhão, participação e corresponsabilidade</li>
        </ul>
      </div>
    </div>
  </Section>
);

const HorariosSection = () => (
  <Section id="horarios" title="Horários de Missas e Confissões" icon={Calendar}>
    <div className="grid md:grid-cols-2 gap-6">
      <div className={`${baseCard}`}>
        <h3 className="font-semibold mb-2">Missas</h3>
        <ul className="text-gray-700 leading-7">
          <li>Domingo: 8h, 10h e 18h</li>
          <li>Sábado (vespertina): 18h</li>
          <li>Segunda a Sexta: 19h</li>
        </ul>
      </div>
      <div className={`${baseCard}`}>
        <h3 className="font-semibold mb-2">Confissões</h3>
        <ul className="text-gray-700 leading-7">
          <li>Quarta e Sexta: 17h às 18h30</li>
          <li>Agendamento pela secretaria para outros horários</li>
        </ul>
      </div>
    </div>
  </Section>
);

const EventosSection = ({ onInscrever }) => {
  const eventos = useEventos();

  return (
    <Section id="eventos" title="Eventos & Quermesse" icon={Calendar}>
      <div className="grid md:grid-cols-3 gap-6">
        {eventos.map((e) => (
          <div key={e.id} className={`${baseCard} flex flex-col`}>
            <h3 className="text-lg font-semibold">{e.titulo}</h3>
            <p className="text-sm text-gray-600">{e.data} — {e.local}</p>
            <p className="text-gray-700 mt-2 flex-1">{e.descricao}</p>
            <div className="mt-4">
              <button
                onClick={() => onInscrever(e)}
                className={`${baseBtn} bg-indigo-600 text-white w-full`}
              >
                Participar / Inscrever-se
              </button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const MatriculasSection = ({ preSelecionada }) => (
  <Section id="matriculas" title="Matrículas em Atividades e Eventos" icon={FileText}>
    <p className="text-gray-700 mb-4">
      Preencha o formulário para participar de pastorais, cursos e eventos da paróquia.
      Você pode escolher a atividade desejada no campo apropriado.
    </p>
    <FormMatricula preSelecionada={preSelecionada} />
  </Section>
);

const MensagensSection = () => (
  <Section id="mensagens" title="Cadastro de Mensagens, Comentários e Sugestões" icon={MessageCircle}>
    <p className="text-gray-700 mb-4">
      Utilize este espaço para enviar comentários, sugestões, testemunhos ou pedidos de oração. Sua mensagem será
      encaminhada à secretaria.
    </p>
    <FormMensagem />
  </Section>
);

const ContatoSection = () => (
  <Section id="contato" title="Contato e Localização" icon={Phone}>
    <div className="grid md:grid-cols-2 gap-6">
      <div className={`${baseCard}`}>
        <h3 className="font-semibold mb-2">Secretaria Paroquial</h3>
        <ul className="text-gray-700 leading-7">
          <li><span className="font-medium">Telefone:</span> (11) 4000-0000</li>
          <li><span className="font-medium">E-mail:</span> contato@santoantonio.paroquia.br</li>
          <li><span className="font-medium">Endereço:</span> Rua da Paróquia, 123 — Centro, Cidade/UF</li>
          <li><span className="font-medium">Atendimento:</span> Terça a Sexta, 9h–12h e 14h–18h</li>
        </ul>
      </div>
      <div className={`${baseCard} p-0 overflow-hidden`}> 
        <div className="h-[320px] w-full">
          <iframe
            title="Mapa da Paróquia"
            className="w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.0000000000005!2d-46.633!3d-23.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sIgreja!5e0!3m2!1spt-BR!2sBR!4v1686070000000"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  </Section>
);

const Footer = () => (
  <footer className="mt-10 border-t border-gray-100">
    <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6 text-sm text-gray-600">
      <div>
        <div className="flex items-center gap-2 font-semibold text-gray-800 mb-2">
          <Church size={20} className="text-indigo-600" /> {brand}
        </div>
        <p>“Paz e bem!” — Conte conosco para caminhar na fé e no serviço.</p>
      </div>
      <div>
        <p className="font-semibold text-gray-800 mb-2">Links rápidos</p>
        <ul className="grid gap-2">
          {navItems.map((i) => (
            <li key={i.id}><a href={`#${i.id}`} className="hover:text-indigo-700">{i.label}</a></li>
          ))}
        </ul>
      </div>
      <div>
        <p className="font-semibold text-gray-800 mb-2">Termos</p>
        <p>Ao enviar formulários, você concorda com o uso dos dados para fins de contato e organização paroquial.</p>
      </div>
    </div>
    <div className="text-center text-xs text-gray-500 pb-8">© {new Date().getFullYear()} {brand}. Todos os direitos reservados.</div>
  </footer>
);

export default function App() {
  const [page, setPage] = useState("home");
  const [preMatricula, setPreMatricula] = useState("");

  // rolagem para âncoras quando mudar 'page'
  useEffect(() => {
    const el = document.getElementById(page);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [page]);

  const onGoTo = (id) => setPage(id);

  const handleInscreverEvento = (evento) => {
    setPreMatricula(evento.titulo);
    setPage("matriculas");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50/30 text-gray-900">
      <Nav current={page} setCurrent={setPage} />

      {/* HOME */}
      <div id="home">
        <HomeSection onGoTo={onGoTo} />
      </div>

      {/* SOBRE */}
      <SobreSection />

      {/* HORÁRIOS */}
      <HorariosSection />

      {/* EVENTOS */}
      <EventosSection onInscrever={handleInscreverEvento} />

      {/* MATRÍCULAS */}
      <div id="matriculas">
        <MatriculasSection preSelecionada={preMatricula} />
      </div>

      {/* MENSAGENS */}
      <div id="mensagens">
        <MensagensSection />
      </div>

      {/* CONTATO */}
      <div id="contato">
        <ContatoSection />
      </div>

      <Footer />
    </div>
  );
}
