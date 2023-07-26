class User < ApplicationRecord
    # One-to-one associations
    has_many :sboms, dependent: :nullify
end
