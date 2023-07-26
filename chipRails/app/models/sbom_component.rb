class SbomComponent < ApplicationRecord
    include ActiveModel::Serializers::JSON

    # One-to-one associations
    has_many :properties, dependent: :destroy
    has_many :dependencies, dependent: :destroy

    # Many-to-many associations
    has_and_belongs_to_many :sboms

    # Makes properties an array
    serialize :properties, Array
end
