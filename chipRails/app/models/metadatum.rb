class Metadatum < ApplicationRecord
    has_many :component, :tool
    belongs_to :sbom
end
