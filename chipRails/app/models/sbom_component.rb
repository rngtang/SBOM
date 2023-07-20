class SbomComponent < ApplicationRecord
    include ActiveModel::Serializers::JSON

    # One-to-one associations
    has_many :properties, dependent: :destroy
    has_one :depedency, dependent: :destroy

    # Many-to-many associations
    has_and_belongs_to_many :sboms

    # Creates array
    serialize :properties, Array
end
