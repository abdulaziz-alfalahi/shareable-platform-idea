
import React from "react";
import CandidateSearchFilters from "./CandidateSearchFilters";
import CandidateCard from "./CandidateCard";
import { useCandidateSearch } from "@/hooks/recruiter/useCandidateSearch";

interface CandidateSearchProps {
  defaultSearchQuery?: string;
}

const CandidateSearch: React.FC<CandidateSearchProps> = ({ defaultSearchQuery = "" }) => {
  const {
    searchQuery,
    setSearchQuery,
    showFilters,
    setShowFilters,
    candidateFilters,
    setCandidateFilters,
    candidates
  } = useCandidateSearch(defaultSearchQuery);

  return (
    <>
      <CandidateSearchFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        candidateFilters={candidateFilters}
        setCandidateFilters={setCandidateFilters}
      />
      
      <div className="space-y-4">
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </div>
    </>
  );
};

export default CandidateSearch;
