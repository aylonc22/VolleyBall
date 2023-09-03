import axios from 'axios';

const createWorkoutPlan = async (planName: string) => {
  const planid = await axios.post(`http://localhost:4000/createPlan`, {
    PlanName: planName,
  });
  console.log(planid);
  return planid;
};

export const requestService = { createWorkoutPlan };
