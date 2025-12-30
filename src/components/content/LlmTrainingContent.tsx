"use client";

export default function LlmTrainingContent() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '2rem'
      }}>
        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '700', 
          marginBottom: '0.5rem',
          color: 'white'
        }}>
          Large Language Models (LLMs) und Modelltraining
        </h3>
        <p style={{ 
          color: 'white',
          fontSize: '1.1rem', 
          lineHeight: '1.8',
          opacity: '0.95',
          marginBottom: '0'
        }}>
          Entdecken Sie die Welt der Large Language Models - von den Grundlagen über Trainingsprozesse 
          bis hin zu praktischen Anwendungen in der Geschäftswelt.
        </p>
      </div>

      {/* Was sind LLMs */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: '#0f172a',
          paddingBottom: '1rem',
          borderBottom: '2px solid #667eea'
        }}>
          Was sind Large Language Models?
        </h3>
        <p style={{ color: '#475569', lineHeight: '1.7', marginBottom: '1rem' }}>
          Large Language Models (LLMs) sind künstliche neuronale Netzwerke, die auf riesigen Textmengen 
          trainiert wurden, um menschliche Sprache zu verstehen und zu generieren. Sie bilden die Grundlage 
          für moderne KI-Anwendungen wie ChatGPT, Claude, Gemini und viele andere intelligente Systeme.
        </p>
        <p style={{ color: '#475569', lineHeight: '1.7', marginBottom: '0' }}>
          Die bekanntesten LLM-Architekturen basieren auf der Transformer-Architektur, die 2017 von Google 
          eingeführt wurde. Modelle wie GPT (Generative Pre-trained Transformer), BERT, LLaMA und PaLM haben 
          die Art und Weise revolutioniert, wie Maschinen mit Sprache umgehen.
        </p>
      </div>

      {/* Training Phasen */}
      <div style={{
        background: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: '#0f172a'
        }}>
          Wie funktioniert das Training von LLMs?
        </h3>
        <p style={{ color: '#475569', lineHeight: '1.7', marginBottom: '1.5rem' }}>
          Das Training eines LLMs erfolgt typischerweise in mehreren Phasen:
        </p>

        {/* Phase 1: Pre-Training */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '1rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h4 style={{
            fontSize: '1.2rem',
            fontWeight: '700',
            color: '#667eea',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.9rem'
            }}>1</span>
            Pre-Training (Vortraining)
          </h4>
          <div style={{ paddingLeft: '2.5rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <strong style={{ color: '#0f172a' }}>Datensammlung:</strong>
              <p style={{ margin: '0.3rem 0 0 0', color: '#475569', lineHeight: '1.6' }}>
                Sammlung riesiger Textkorpora aus dem Internet, Büchern, wissenschaftlichen Artikeln und anderen Quellen. 
                Moderne LLMs werden auf Hunderten von Milliarden bis Billionen von Tokens trainiert.
              </p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong style={{ color: '#0f172a' }}>Selbstüberwachtes Lernen:</strong>
              <p style={{ margin: '0.3rem 0 0 0', color: '#475569', lineHeight: '1.6' }}>
                Das Modell lernt durch Vorhersage des nächsten Wortes (oder Tokens) in einem Text. Diese Methode erfordert 
                keine manuell gelabelten Daten.
              </p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong style={{ color: '#0f172a' }}>Tokenisierung:</strong>
              <p style={{ margin: '0.3rem 0 0 0', color: '#475569', lineHeight: '1.6' }}>
                Der Text wird in kleinere Einheiten (Tokens) zerlegt, die das Modell verarbeiten kann. Ein Token kann ein 
                ganzes Wort, ein Wortteil oder sogar ein einzelnes Zeichen sein.
              </p>
            </div>
            <div>
              <strong style={{ color: '#0f172a' }}>Gradientenabstieg:</strong>
              <p style={{ margin: '0.3rem 0 0 0', color: '#475569', lineHeight: '1.6' }}>
                Durch Backpropagation und Optimierungsalgorithmen wie Adam oder SGD werden die Milliarden von Parametern 
                des Modells angepasst, um die Vorhersagegenauigkeit zu maximieren.
              </p>
            </div>
          </div>
        </div>

        {/* Phase 2: Fine-Tuning */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '1rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h4 style={{
            fontSize: '1.2rem',
            fontWeight: '700',
            color: '#667eea',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.9rem'
            }}>2</span>
            Fine-Tuning (Feinabstimmung)
          </h4>
          <div style={{ paddingLeft: '2.5rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <strong style={{ color: '#0f172a' }}>Supervised Fine-Tuning (SFT):</strong>
              <p style={{ margin: '0.3rem 0 0 0', color: '#475569', lineHeight: '1.6' }}>
                Das Modell wird auf spezifischen Aufgaben mit gelabelten Daten weiter trainiert, z.B. für 
                Frage-Antwort-Systeme oder Code-Generierung.
              </p>
            </div>
            <div>
              <strong style={{ color: '#0f172a' }}>Domain-Anpassung:</strong>
              <p style={{ margin: '0.3rem 0 0 0', color: '#475569', lineHeight: '1.6' }}>
                Training auf fachspezifischen Daten (z.B. medizinische Texte, juristische Dokumente) für 
                spezialisierte Anwendungen.
              </p>
            </div>
          </div>
        </div>

        {/* Phase 3: RLHF */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h4 style={{
            fontSize: '1.2rem',
            fontWeight: '700',
            color: '#667eea',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.9rem'
            }}>3</span>
            RLHF (Reinforcement Learning from Human Feedback)
          </h4>
          <div style={{ paddingLeft: '2.5rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <strong style={{ color: '#0f172a' }}>Bewertung durch Menschen:</strong>
              <p style={{ margin: '0.3rem 0 0 0', color: '#475569', lineHeight: '1.6' }}>
                Menschliche Bewerter bewerten die Qualität der Modellantworten und geben Feedback zu Faktentreue, 
                Hilfsbereitschaft und Sicherheit.
              </p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong style={{ color: '#0f172a' }}>Reward Model:</strong>
              <p style={{ margin: '0.3rem 0 0 0', color: '#475569', lineHeight: '1.6' }}>
                Ein separates Modell wird trainiert, um die Präferenzen der menschlichen Bewerter vorherzusagen.
              </p>
            </div>
            <div>
              <strong style={{ color: '#0f172a' }}>Policy Optimization:</strong>
              <p style={{ margin: '0.3rem 0 0 0', color: '#475569', lineHeight: '1.6' }}>
                Das LLM wird durch Reinforcement Learning (z.B. PPO - Proximal Policy Optimization) optimiert, um 
                Ausgaben zu generieren, die höhere Bewertungen vom Reward Model erhalten.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Transformer Architektur */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: '#0f172a',
          paddingBottom: '1rem',
          borderBottom: '2px solid #667eea'
        }}>
          Technische Architektur
        </h3>
        
        <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0f172a', marginBottom: '1rem' }}>
          Transformer-Architektur
        </h4>
        <p style={{ color: '#475569', lineHeight: '1.7', marginBottom: '1rem' }}>
          Die meisten modernen LLMs basieren auf der Transformer-Architektur mit folgenden Komponenten:
        </p>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          {[
            { 
              title: 'Self-Attention Mechanismus', 
              desc: 'Ermöglicht dem Modell, Beziehungen zwischen verschiedenen Wörtern in einem Text zu erfassen, unabhängig von ihrer Entfernung.' 
            },
            { 
              title: 'Multi-Head Attention', 
              desc: 'Mehrere Attention-Heads können verschiedene Aspekte der Beziehungen zwischen Wörtern parallel erfassen.' 
            },
            { 
              title: 'Feed-Forward Neural Networks', 
              desc: 'Vollständig verbundene Schichten, die auf jede Position im Eingabetext angewendet werden.' 
            },
            { 
              title: 'Layer Normalization', 
              desc: 'Stabilisiert das Training tiefer Netzwerke.' 
            },
            { 
              title: 'Positional Encoding', 
              desc: 'Fügt Informationen über die Position der Wörter im Text hinzu, da Transformer keine inhärente sequentielle Struktur haben.' 
            }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: '#f8f9fa',
              padding: '1rem',
              borderRadius: '8px',
              borderLeft: '4px solid #667eea'
            }}>
              <div style={{ fontWeight: '700', color: '#667eea', marginBottom: '0.3rem' }}>
                {item.title}
              </div>
              <div style={{ color: '#475569', lineHeight: '1.6', fontSize: '0.95rem' }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>

        <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0f172a', margin: '1.5rem 0 1rem' }}>
          Modellparameter
        </h4>
        <p style={{ color: '#475569', lineHeight: '1.7', marginBottom: '1rem' }}>
          Die Größe eines LLMs wird oft in Parametern gemessen:
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          {[
            { model: 'GPT-3', params: '175 Milliarden Parameter' },
            { model: 'PaLM', params: '540 Milliarden Parameter' },
            { model: 'GPT-4', params: 'Über 1 Billion Parameter*' },
            { model: 'LLaMA 2', params: '7B, 13B, 70B Varianten' }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '1rem',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.3rem' }}>
                {item.model}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                {item.params}
              </div>
            </div>
          ))}
        </div>
        <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.5rem', fontStyle: 'italic' }}>
          * Nicht offiziell bestätigt
        </p>
      </div>

      {/* Rechenressourcen */}
      <div style={{
        background: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: '#0f172a'
        }}>
          Rechenressourcen und Infrastruktur
        </h3>
        <p style={{ color: '#475569', lineHeight: '1.7', marginBottom: '1.5rem' }}>
          Das Training großer Sprachmodelle erfordert enorme Rechenleistung:
        </p>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          {[
            {
              icon: '🖥️',
              title: 'Hardware',
              text: 'Tausende von GPUs oder TPUs (Tensor Processing Units), oft in Cloud-Rechenzentren. Moderne Trainingsläufe nutzen NVIDIA A100 oder H100 GPUs.'
            },
            {
              icon: '🌐',
              title: 'Distributed Training',
              text: 'Das Modell und die Daten werden über viele Maschinen verteilt. Techniken wie Data Parallelism, Model Parallelism und Pipeline Parallelism werden eingesetzt.'
            },
            {
              icon: '💰',
              title: 'Kosten',
              text: 'Das Training eines großen LLMs kann mehrere Millionen Dollar kosten und mehrere Monate dauern.'
            },
            {
              icon: '⚡',
              title: 'Energieverbrauch',
              text: 'Der Trainingsvorgang verbraucht erhebliche Mengen an Energie, was Fragen zur ökologischen Nachhaltigkeit aufwirft.'
            }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '2rem', flexShrink: 0 }}>
                {item.icon}
              </div>
              <div>
                <div style={{ fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>
                  {item.title}
                </div>
                <div style={{ color: '#475569', lineHeight: '1.6' }}>
                  {item.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trainingstechniken */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: '#0f172a',
          paddingBottom: '1rem',
          borderBottom: '2px solid #667eea'
        }}>
          Trainingstechniken und Optimierungen
        </h3>
        
        <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0f172a', marginBottom: '1rem' }}>
          Effiziente Trainingsmethoden
        </h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          {[
            {
              title: 'Mixed Precision Training',
              desc: 'Verwendung von 16-Bit statt 32-Bit Floating-Point-Zahlen, um Speicher zu sparen und das Training zu beschleunigen.'
            },
            {
              title: 'Gradient Checkpointing',
              desc: 'Reduziert den Speicherverbrauch durch selektives Speichern von Zwischenergebnissen während der Backpropagation.'
            },
            {
              title: 'LoRA (Low-Rank Adaptation)',
              desc: 'Effiziente Fine-Tuning-Methode, die nur einen kleinen Teil der Parameter anpasst.'
            },
            {
              title: 'Quantisierung',
              desc: 'Reduzierung der Präzision der Modellgewichte nach dem Training, um die Inferenzgeschwindigkeit zu erhöhen.'
            }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: '#f8f9fa',
              padding: '1rem',
              borderRadius: '8px',
              borderLeft: '4px solid #667eea'
            }}>
              <div style={{ fontWeight: '700', color: '#667eea', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                {item.title}
              </div>
              <div style={{ color: '#475569', lineHeight: '1.6', fontSize: '0.9rem' }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>

        <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0f172a', marginBottom: '1rem' }}>
          Datenaufbereitung
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { label: 'Datenbereinigung', text: 'Entfernung von toxischen, voreingenommenen oder qualitativ minderwertigen Inhalten.' },
            { label: 'Deduplication', text: 'Entfernung von Duplikaten, um Überanpassung zu vermeiden.' },
            { label: 'Datenbalancierung', text: 'Sicherstellung einer ausgewogenen Repräsentation verschiedener Sprachen, Themen und Perspektiven.' }
          ].map((item, idx) => (
            <div key={idx} style={{
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'flex-start'
            }}>
              <div style={{ color: '#667eea', fontSize: '1.2rem', fontWeight: '700', flexShrink: 0 }}>
                ✓
              </div>
              <div>
                <strong style={{ color: '#0f172a' }}>{item.label}:</strong>{' '}
                <span style={{ color: '#475569' }}>{item.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Evaluation */}
      <div style={{
        background: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: '#0f172a'
        }}>
          Evaluation und Benchmarks
        </h3>
        <p style={{ color: '#475569', lineHeight: '1.7', marginBottom: '1.5rem' }}>
          Die Leistung von LLMs wird anhand verschiedener Benchmarks gemessen:
        </p>
        
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {[
            { name: 'MMLU', desc: 'Testet Wissen über verschiedene Domänen hinweg.' },
            { name: 'HumanEval', desc: 'Bewertet die Fähigkeit zur Code-Generierung.' },
            { name: 'TruthfulQA', desc: 'Misst die Faktentreue von Modellantworten.' },
            { name: 'BigBench', desc: 'Sammlung von über 200 verschiedenen Aufgaben zur umfassenden Evaluation.' },
            { name: 'HELM', desc: 'Bewertet Modelle nach mehreren Dimensionen wie Genauigkeit, Fairness, Robustheit und Effizienz.' }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: 'white',
              padding: '1rem',
              borderRadius: '8px',
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                minWidth: '110px',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                fontWeight: '700',
                textAlign: 'center'
              }}>
                {item.name}
              </div>
              <div style={{ color: '#475569', lineHeight: '1.6', fontSize: '0.95rem' }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Herausforderungen */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: '#0f172a',
          paddingBottom: '1rem',
          borderBottom: '2px solid #667eea'
        }}>
          Herausforderungen und Zukunft
        </h3>
        
        <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0f172a', marginBottom: '1rem' }}>
          Aktuelle Herausforderungen
        </h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {[
            { 
              icon: '⚠️',
              title: 'Halluzinationen', 
              desc: 'LLMs können überzeugend klingende, aber faktisch falsche Informationen generieren.' 
            },
            { 
              icon: '⚖️',
              title: 'Bias und Fairness', 
              desc: 'Modelle können Vorurteile aus den Trainingsdaten übernehmen und reproduzieren.' 
            },
            { 
              icon: '🔍',
              title: 'Interpretierbarkeit', 
              desc: 'Es ist schwierig zu verstehen, wie LLMs zu bestimmten Entscheidungen kommen.' 
            },
            { 
              icon: '💸',
              title: 'Kosten und Zugänglichkeit', 
              desc: 'Das Training und der Betrieb großer Modelle sind teuer und energieintensiv.' 
            }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: '#fff5f5',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid #fed7d7'
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                {item.icon}
              </div>
              <div style={{ fontWeight: '700', color: '#c53030', marginBottom: '0.5rem' }}>
                {item.title}
              </div>
              <div style={{ color: '#475569', lineHeight: '1.6', fontSize: '0.9rem' }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>

        <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0f172a', marginBottom: '1rem' }}>
          Zukünftige Entwicklungen
        </h4>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {[
            { 
              icon: '🎨',
              title: 'Multimodale Modelle', 
              desc: 'Integration von Text, Bildern, Audio und Video in einem einzigen Modell (z.B. GPT-4V, Gemini).' 
            },
            { 
              icon: '📏',
              title: 'Längerer Kontext', 
              desc: 'Erweiterung der Kontextlänge von aktuell einigen tausend Tokens auf Millionen von Tokens.' 
            },
            { 
              icon: '⚡',
              title: 'Effizientere Architekturen', 
              desc: 'Entwicklung von Modellen, die mit weniger Parametern und Rechenleistung vergleichbare Leistung erzielen.' 
            },
            { 
              icon: '🎯',
              title: 'Spezialisierte Modelle', 
              desc: 'Domain-spezifische LLMs für Medizin, Recht, Wissenschaft und andere Fachgebiete.' 
            },
            { 
              icon: '🤖',
              title: 'Agenten und Tool-Nutzung', 
              desc: 'Integration von LLMs mit externen Tools und APIs für erweiterte Fähigkeiten (Model Context Protocol, Function Calling).' 
            }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: '#f0fdf4',
              padding: '1rem',
              borderRadius: '8px',
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start',
              border: '1px solid #bbf7d0'
            }}>
              <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>
                {item.icon}
              </div>
              <div>
                <div style={{ fontWeight: '700', color: '#15803d', marginBottom: '0.3rem' }}>
                  {item.title}
                </div>
                <div style={{ color: '#475569', lineHeight: '1.6', fontSize: '0.9rem' }}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Praktische Anwendungen */}
      <div style={{
        background: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: '#0f172a'
        }}>
          Praktische Anwendungen
        </h3>
        <p style={{ color: '#475569', lineHeight: '1.7', marginBottom: '1.5rem' }}>
          LLMs werden bereits in vielen Bereichen eingesetzt:
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem'
        }}>
          {[
            { icon: '💬', title: 'Kundenservice', desc: 'Automatisierte Chatbots und virtuelle Assistenten' },
            { icon: '✍️', title: 'Content-Erstellung', desc: 'Texterstellung, Übersetzung, Zusammenfassung' },
            { icon: '💻', title: 'Code-Generierung', desc: 'Entwicklungsassistenten wie GitHub Copilot' },
            { icon: '🎓', title: 'Bildung', desc: 'Personalisierte Tutoren und Lernassistenten' },
            { icon: '🔎', title: 'Recherche', desc: 'Informationssuche und Wissensaggregation' },
            { icon: '⚙️', title: 'Prozessautomatisierung', desc: 'Integration mit Business-Process-Management-Systemen' }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              textAlign: 'center',
              transition: 'transform 0.2s'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                {item.icon}
              </div>
              <div style={{ fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>
                {item.title}
              </div>
              <div style={{ color: '#64748b', lineHeight: '1.6', fontSize: '0.9rem' }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Open Source LLMs */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: '#0f172a',
          paddingBottom: '1rem',
          borderBottom: '2px solid #667eea'
        }}>
          Open-Source LLMs
        </h3>
        <p style={{ color: '#475569', lineHeight: '1.7', marginBottom: '1.5rem' }}>
          Die Open-Source-Community hat bedeutende Fortschritte gemacht:
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem'
        }}>
          {[
            { name: 'LLaMA 2 & 3', desc: 'Von Meta veröffentlichte Modelle, die für kommerzielle Nutzung verfügbar sind' },
            { name: 'Mistral', desc: 'Hochleistungsfähige Open-Source-Modelle aus Frankreich' },
            { name: 'Falcon', desc: 'Von der Technology Innovation Institute entwickelte Modelle' },
            { name: 'MPT', desc: 'MosaicML Pretrained Transformer - kommerziell nutzbare Modelle' },
            { name: 'Hugging Face', desc: 'Plattform für das Teilen und Deployen von Modellen' }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: '#f8f9fa',
              padding: '1.25rem',
              borderRadius: '8px',
              borderLeft: '4px solid #667eea'
            }}>
              <div style={{ 
                fontWeight: '700', 
                color: '#667eea', 
                marginBottom: '0.5rem',
                fontSize: '1.05rem'
              }}>
                {item.name}
              </div>
              <div style={{ color: '#475569', lineHeight: '1.6', fontSize: '0.9rem' }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '2rem',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <h3 style={{ 
          fontSize: '1.4rem', 
          fontWeight: '700', 
          marginBottom: '1rem',
          color: 'white'
        }}>
          Möchten Sie LLMs in Ihre Geschäftsprozesse integrieren?
        </h3>
        <p style={{
          margin: '0 0 1.5rem 0',
          fontSize: '1.05rem',
          lineHeight: '1.7',
          color: 'white',
          opacity: 0.95
        }}>
          Wir helfen Ihnen bei der Auswahl, dem Fine-Tuning und der Integration von Large Language 
          Models in Ihre bestehende IT-Infrastruktur. Unsere Expertise umfasst sowohl proprietäre 
          als auch Open-Source-Lösungen sowie die Integration mit Process-Automation-Plattformen 
          wie Camunda.
        </p>
        <button style={{
          background: 'white',
          color: '#667eea',
          padding: '0.75rem 2rem',
          borderRadius: '8px',
          border: 'none',
          fontSize: '1rem',
          fontWeight: '700',
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          Beratungsgespräch vereinbaren
        </button>
      </div>
    </div>
  );
}
