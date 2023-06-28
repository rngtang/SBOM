class Metadatum < ApplicationRecord
    belongs_to :sbom
<<<<<<< HEAD
    has_many :tools, dependent: :destroy
    has_many :components, dependent: :destroy
=======
    has_many :tools
    has_many :components
>>>>>>> 10-expandDatabase
end
