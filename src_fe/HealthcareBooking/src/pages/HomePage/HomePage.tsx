import Specialty from './Section/Specialty';
import OutStandingDoctor from './Section/OutStandingDoctor';
import MedicalFacility from './Section/MedicalFacility';
export const HomePage: React.FC = () => {
  return (
    <div>
      <Specialty/>
      <OutStandingDoctor/>
      <MedicalFacility/>
    </div>
  );
};
