class Metadatum < ApplicationRecord
    include ActiveModel::Serializers::JSON
    belongs_to :sbom
    has_many :tools, dependent: :destroy
    serialize :tools, Array
end
