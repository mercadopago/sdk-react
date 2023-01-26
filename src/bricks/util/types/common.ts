interface IPayerIdentification {
  type: string;
  number: string;
}

interface IBrickError {
  type: 'non_critical' | 'critical';
  cause: string;
  message: string;
}
