class Metadatum < ApplicationRecord
    belongs_to :sbom
    has_many :tools, dependent: :destroy
    has_many :components, dependent: :destroy
end
