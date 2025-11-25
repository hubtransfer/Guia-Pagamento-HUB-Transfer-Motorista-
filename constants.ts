import { Calendar, DollarSign, Clock, Briefcase } from 'lucide-react';

export interface PaymentRule {
  id: string;
  operator: string;
  workPeriod: string;
  paymentDateDescription: string;
  icon: any;
  color: string;
  details: string;
}

export const PAYMENT_RULES: PaymentRule[] = [
  {
    id: 'hotels',
    operator: 'Hotéis',
    workPeriod: '01 a 31 (Mês Atual)',
    paymentDateDescription: 'Dia 03 (Mês Seguinte)',
    icon: Calendar,
    color: 'bg-blue-600',
    details: 'Pagamento unificado referente a todos os dias trabalhados no mês anterior.'
  },
  {
    id: 'wt',
    operator: 'World Transfer',
    workPeriod: 'Quinzenal',
    paymentDateDescription: 'Dia 25 (Atual) ou 10 (Seguinte)',
    icon: Briefcase,
    color: 'bg-hub-yellow text-black',
    details: 'Ciclo rápido: trabalhos da 1ª quinzena são pagos no mesmo mês.'
  },
  {
    id: 'talixo',
    operator: 'Talixo',
    workPeriod: 'Quinzenal',
    paymentDateDescription: 'Dia 10 ou 25-28 (Seguinte)',
    icon: Clock,
    color: 'bg-emerald-600',
    details: 'Pagamentos sempre ocorrem no mês seguinte ao trabalho realizado.'
  }
];

export const calculatePaymentDate = (day: number) => {
  const results = [];

  // Hotels
  results.push({
    operator: 'Hotéis',
    period: '01-31',
    payment: 'Dia 03 do Mês Seguinte',
    status: 'next-month',
    isUrgent: false
  });

  // World Transfer
  if (day <= 15) {
    results.push({
      operator: 'World Transfer',
      period: '01-15',
      payment: 'Dia 25 deste Mês',
      status: 'current-month',
      isUrgent: true // Gets paid fast
    });
  } else {
    results.push({
      operator: 'World Transfer',
      period: '16-31',
      payment: 'Dia 10 do Mês Seguinte',
      status: 'next-month',
      isUrgent: false
    });
  }

  // Talixo
  if (day <= 15) {
    results.push({
      operator: 'Talixo',
      period: '01-15',
      payment: 'Dia 10 do Mês Seguinte',
      status: 'next-month',
      isUrgent: false
    });
  } else {
    results.push({
      operator: 'Talixo',
      period: '16-31',
      payment: 'Entre dia 25 e 28 do Mês Seguinte',
      status: 'next-month-late',
      isUrgent: false
    });
  }

  return results;
};