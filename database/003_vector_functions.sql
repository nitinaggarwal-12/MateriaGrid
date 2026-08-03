-- Production Vector Proximity Handler for MateriaGrid
CREATE OR REPLACE FUNCTION match_rubrics_by_embedding (
  query_embedding VECTOR(1536),
  match_threshold FLOAT,
  match_count INT
)
RETURNS TABLE (
  rubric_id UUID,
  chapter VARCHAR(50),
  hierarchical_path TEXT[],
  full_string_path TEXT,
  embryological_layer VARCHAR(15),
  similarity_score FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    rubrics.rubric_id,
    rubrics.chapter,
    rubrics.hierarchical_path,
    rubrics.full_string_path,
    rubrics.embryological_layer,
    (1 - (rubrics.semantic_embedding <=> query_embedding))::FLOAT AS similarity_score
  FROM rubrics
  WHERE (1 - (rubrics.semantic_embedding <=> query_embedding)) > match_threshold
  ORDER BY (rubrics.semantic_embedding <=> query_embedding) ASC
  LIMIT match_count;
END;
$$;
